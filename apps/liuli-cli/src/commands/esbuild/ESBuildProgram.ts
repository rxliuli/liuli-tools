import { build, BuildOptions, Platform, Plugin } from 'esbuild'
import { readJson } from 'fs-extra'
import path from 'path'
import { PackageJson } from 'type-fest'
import { dtsPlugin } from 'esbuild-plugin-d.ts'

export class ESBuildProgram {
  constructor(private readonly base: string) {}
  async build(options: BuildOptions[]): Promise<void> {
    await Promise.all([
      ...options.map(async (option) => {
        await build(option)
      }),
    ] as Promise<void>[])
  }

  async getDeps(): Promise<string[]> {
    const json = (await readJson(
      path.resolve(this.base, 'package.json'),
    )) as PackageJson
    return Object.keys({
      ...json.dependencies,
      ...json.devDependencies,
      ...json.peerDependencies,
    })
  }

  async getBuildPkgOptions(isWatch: boolean): Promise<BuildOptions[]> {
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
    return outputOptions.map(
      (output) =>
        ({
          ...output,
          entryPoints: ['./src/index.ts'],
          watch: isWatch,
          bundle: true,
          external: deps,
          platform: 'node',
          plugins: [dtsPlugin()],
        } as BuildOptions),
    )
  }

  async buildPkg(isWatch: boolean): Promise<void> {
    await this.build(await this.getBuildPkgOptions(isWatch))
  }

  async getPlatform(): Promise<Platform> {
    const json = await readJson(path.resolve(this.base, 'tsconfig.json'))
    const isBrowser = (json.lib as string[])?.some(
      (lib) => lib.toLowerCase() === 'dom',
    )
    return isBrowser ? 'browser' : 'node'
  }

  async buildCli(isWatch: boolean): Promise<void> {
    const plugins: Plugin[] = []
    const platform = await this.getPlatform()
    if (platform === 'node') {
      plugins.push(nodeExternals())
    }
    const deps = await this.getDeps()
    await Promise.all([
      this.build([
        {
          entryPoints: ['./src/bin.ts'],
          outfile: './dist/bin.js',
          format: 'cjs',
          sourcemap: true,
          platform,
          watch: isWatch,
          bundle: true,
          minify: !isWatch,
          banner: {
            js: '#!/usr/bin/env node',
          },
          external: ['esbuild', 'pnpapi', ...(isWatch ? deps : [])],
          plugins,
        } as BuildOptions,
        ...(await this.getBuildPkgOptions(isWatch)),
      ]),
      this.buildPkg(isWatch),
    ])
  }
}

/**
 * 排除和替换 node 内置模块
 */
function nodeExternals(): Plugin {
  return {
    name: 'esbuild-plugin-node-externals',
    setup(build) {
      build.onResolve({ filter: /(^node:)/ }, (args) => ({
        path: args.path.slice(5),
        external: true,
      }))
    },
  }
}

/**
 * 存在一些问题
 * @link https://github.com/evanw/esbuild/issues/1634
 */
function autoExternal(): Plugin {
  return {
    name: 'esbuild-plugin-auto-external',
    setup(build) {
      build.onResolve({ filter: /^(?!\.{1,2}\/)/ }, (args) => {
        console.log('esbuild-plugin-auto-external: ', args.path)
        return {
          path: args.path,
          external: true,
        }
      })
    },
  }
}
