import { build, BuildOptions } from 'esbuild'
import { execPromise } from './utils/execPromise'
import { readJson } from 'fs-extra'
import * as path from 'path'
import { PackageJson } from 'type-fest'

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
    await Promise.all([
      execPromise(
        `tsc --emitDeclarationOnly --outDir dist ${isWatch ? '--watch' : ''}`,
        {
          cwd: path.resolve(),
        },
      ),
      this.build(rollupOptions),
    ])
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
