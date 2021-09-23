import { build, BuildOptions } from 'esbuild'
import { execPromise } from './utils/execPromise'
import { readJson, remove, unlink, writeJson } from 'fs-extra'
import * as path from 'path'
import { PackageJson } from 'type-fest'
import { merge } from 'lodash'
import { CompilerOptions } from 'typescript'

export class ESBuildProgram {
  async build(options: BuildOptions[]): Promise<void> {
    await Promise.all([
      ...options.map(async (option) => {
        await build(option)
      }),
    ] as Promise<void>[])
  }

  async getDeps(): Promise<string[]> {
    const json = (await readJson(path.resolve('package.json'))) as PackageJson
    return Object.keys({
      ...json.dependencies,
      ...json.devDependencies,
      ...json.peerDependencies,
    })
  }

  async genDTS(isWatch: boolean): Promise<void> {
    const json = await readJson(path.resolve('tsconfig.json'))
    const newTSConfig = merge(json, {
      compilerOptions: {
        declaration: true,
        declarationMap: true,
        incremental: true,
        outDir: 'dist',
        emitDeclarationOnly: true,
      } as CompilerOptions,
      exclude: [...(json.exclude ?? []), '**/__tests__/*.test.ts'],
    })
    const buildTSConfigPath = path.resolve('esbuild.tsconfig.json')
    await writeJson(buildTSConfigPath, newTSConfig)
    await execPromise(
      `tsc --project ${buildTSConfigPath} ${isWatch ? '--watch' : ''}`,
      {
        cwd: path.resolve(),
      },
    )
    await unlink(buildTSConfigPath)
    await remove(buildTSConfigPath)
  }
  async buildPkg(isWatch: boolean): Promise<void> {
    const outputOptions: BuildOptions[] = [
      {
        outfile: './dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        outfile: './dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ]
    const deps = await this.getDeps()
    const rollupOptions = outputOptions.map(
      (output) =>
        ({
          ...output,
          entryPoints: ['./src/index.ts'],
          watch: isWatch,
          bundle: true,
          external: deps,
          platform: 'node',
        } as BuildOptions),
    )
    await Promise.all([this.genDTS(isWatch), this.build(rollupOptions)])
  }

  async buildCli(isWatch: boolean): Promise<void> {
    const deps = await this.getDeps()
    await Promise.all([
      this.build([
        {
          entryPoints: ['./src/bin.ts'],
          outfile: './dist/bin.js',
          format: 'cjs',
          sourcemap: true,
          platform: 'node',
          watch: isWatch,
          bundle: true,
          minify: !isWatch,
          banner: {
            js: '#!/usr/bin/env node',
          },
          external: ['esbuild', ...(isWatch ? deps : [])],
        } as BuildOptions,
      ]),
      this.buildPkg(isWatch),
    ])
  }
}
