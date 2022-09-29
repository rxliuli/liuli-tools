import { build, BuildOptions, Platform, Plugin } from 'esbuild'
import { pathExists, readFile, readJson, remove } from '@liuli-util/fs-extra'
import * as path from 'path'
import { PackageJson } from 'type-fest'
import { Project } from 'ts-morph'
import { promise } from 'glob-promise'
import { IOptions } from 'glob'
import { watch } from 'chokidar'
import Spinnies from 'spinnies'
import { debounce } from './util/debounce'
import { parse } from 'json5'
import { getPkgGlobalName } from './util/getPkgGlobalName'
import { nativeNodeModules, nodeExternal, resolve, userJS } from './util'

interface ESBuildProgramOptions {
  base: string
  isWatch: boolean
}

interface Task {
  title: string
  task(): Promise<any>
}

export type TaskTypeEnum = 'esm' | 'cjs' | 'iife' | 'cli' | 'dts' | 'userjs'

export class ESBuildProgram {
  constructor(private readonly options: ESBuildProgramOptions) {}

  set isWatch(isWatch: boolean) {
    this.options.isWatch = isWatch
  }

  static readonly globalExternal = ['esbuild', 'pnpapi', 'ts-morph', 'ssh2']

  /**
   * 获取所有依赖
   */
  static async getDeps(base: string): Promise<string[]> {
    const json = (await readJson(path.resolve(base, 'package.json'))) as PackageJson

    return Object.keys({
      ...json.dependencies,
      ...json.devDependencies,
      ...json.peerDependencies,
    })
  }

  /**
   * 获取所在模块的类型
   */
  static async getPlatform(base: string): Promise<Platform> {
    const tsconfigPath = path.resolve(base, 'tsconfig.json')

    if (await pathExists(tsconfigPath)) {
      const tsconfigJson = parse(await readFile(tsconfigPath, 'utf-8'))

      if ((tsconfigJson?.compilerOptions?.lib as string[])?.some((lib) => lib.toLowerCase() === 'dom')) {
        return 'browser'
      }
    }

    const pkgPath = path.resolve(base, 'package.json')

    if (await pathExists(pkgPath)) {
      const pkgJson = (await readJson(pkgPath)) as PackageJson

      if (Object.keys(pkgJson.devDependencies ?? {}).includes('@types/node')) {
        return 'node'
      }
    }

    return 'neutral'
  }

  static getWatchOptions(base: string): {
    pattern: string
    options: IOptions
  } {
    const pattern = 'src/**/*.ts'

    const options: Pick<IOptions, 'cwd' | 'ignore'> = {
      cwd: base,
      ignore: '**/__tests__/**/*',
    }

    return {
      pattern,
      options,
    }
  }

  /**
   * 生成类型定义
   */
  async genDTS(): Promise<void> {
    const base = this.options.base

    const { pattern, options } = ESBuildProgram.getWatchOptions(this.options.base)

    const project = new Project({
      tsConfigFilePath: path.resolve(base, 'tsconfig.json'),
      skipAddingFilesFromTsConfig: true,

      compilerOptions: {
        emitDeclarationOnly: true,
        noEmit: false,
        incremental: this.options.isWatch,
      },
    })

    const fileList = (await promise(pattern, options)).map((filePath) => path.resolve(base, filePath))
    project.addSourceFilesAtPaths(fileList)

    await project.emit({
      emitOnlyDtsFiles: true,
    })
  }

  /**
   * 获取构建 cjs 的选项
   */
  getBuildUserJSOption(): BuildOptions {
    return {
      entryPoints: [path.resolve(this.options.base, './src/index.ts')],
      outfile: path.resolve(this.options.base, './dist/index.user.js'),
      format: 'iife',
      bundle: true,
      external: [...ESBuildProgram.globalExternal],
      platform: 'browser',
      plugins: [userJS() as any],
      incremental: this.options.isWatch,
      absWorkingDir: this.options.base,
    }
  }

  /**
   * 获取构建 cjs 的选项
   * @param deps
   */
  getBuildCjsOption({ deps, platform }: { deps: string[]; platform: Platform }): BuildOptions {
    return {
      entryPoints: [path.resolve(this.options.base, './src/index.ts')],
      outfile: path.resolve(this.options.base, './dist/index.js'),
      format: 'cjs',
      sourcemap: true,
      bundle: true,
      external: [...ESBuildProgram.globalExternal, ...deps],
      platform: platform,
      minify: !this.options.isWatch,
      incremental: this.options.isWatch,
      metafile: this.options.isWatch,

      plugins: [resolve([['@liuli-util/esbuild-plugins/src/', '@liuli-util/esbuild-plugins']])] as any,
    }
  }

  /**
   * 获取构建 esm 的选项
   * @param deps
   */
  getBuildESMOption({ deps, platform }: { deps: string[]; platform: Platform }): BuildOptions {
    return {
      entryPoints: [path.resolve(this.options.base, './src/index.ts')],
      outfile: path.resolve(this.options.base, './dist/index.esm.js'),
      format: 'esm',
      sourcemap: true,
      bundle: true,
      external: [...ESBuildProgram.globalExternal, ...deps],
      platform: platform,
      minify: !this.options.isWatch,
      incremental: this.options.isWatch,
      metafile: this.options.isWatch,

      plugins: [resolve([['@liuli-util/esbuild-plugins/src/', '@liuli-util/esbuild-plugins']])] as any,
    }
  }

  /**
   * 获取构建 iife 的选项
   * @param deps
   */
  getBuildIifeOption({ platform, globalName }: { platform: Platform; globalName: string }): BuildOptions {
    return {
      entryPoints: [path.resolve(this.options.base, './src/index.ts')],
      outfile: path.resolve(this.options.base, './dist/index.iife.js'),
      format: 'iife',
      sourcemap: true,
      bundle: true,
      external: [...ESBuildProgram.globalExternal],
      platform: platform,
      minify: !this.options.isWatch,
      incremental: this.options.isWatch,
      metafile: this.options.isWatch,
      globalName,
    }
  }

  /**
   * 获取构建 cli 的选项
   * @param deps
   */
  getBuildCliOption({ platform }: { deps: string[]; platform: Platform }): BuildOptions {
    const plugins = ESBuildProgram.getPlugins(platform)

    return {
      entryPoints: [path.resolve(this.options.base, './src/bin.ts')],
      outfile: path.resolve(this.options.base, './dist/bin.js'),
      format: 'cjs',
      sourcemap: true,
      platform: platform,
      bundle: true,

      banner: {
        js: '#!/usr/bin/env node',
      },

      external: [...ESBuildProgram.globalExternal],
      plugins,
      minify: !this.options.isWatch,
      incremental: this.options.isWatch,
      metafile: this.options.isWatch,
    }
  }

  static getPlugins(platform: string): Plugin[] {
    const plugins: Plugin[] = []

    if (platform === 'node') {
      plugins.push(nodeExternal() as any, nativeNodeModules() as any)
    }

    return plugins
  }

  async build(options: BuildOptions): Promise<void> {
    // if (this.options.isWatch) {
    //   options.plugins = [...(options.plugins ?? []), metafile(options.outfile + '.meta.json')]
    // }
    await build(options)
  }

  async getTasks(): Promise<Record<TaskTypeEnum, Task>> {
    const deps = await ESBuildProgram.getDeps(this.options.base)
    const platform = await ESBuildProgram.getPlatform(this.options.base)

    return {
      esm: {
        title: '构建 esm',

        task: () =>
          this.build(
            this.getBuildESMOption({
              deps: deps,
              platform: platform,
            }),
          ),
      },

      cjs: {
        title: '构建 cjs',

        task: () =>
          this.build(
            this.getBuildCjsOption({
              deps: deps,
              platform: platform,
            }),
          ),
      },

      iife: {
        title: '构建 iife',

        task: async () => {
          return await this.build(
            this.getBuildIifeOption({
              platform: platform,

              globalName: getPkgGlobalName(
                ((await readJson(path.resolve(this.options.base, './package.json'))) as PackageJson).name!,
              ),
            }),
          )
        },
      },

      cli: {
        title: '构建 cli',

        task: () =>
          build(
            this.getBuildCliOption({
              deps: deps,
              platform: platform,
            }),
          ),
      },

      dts: {
        title: '生成类型定义',
        task: () => this.genDTS(),
      },

      userjs: {
        title: '打包 userjs',
        task: () => this.build(this.getBuildUserJSOption()),
      },
    }
  }

  static async execTask(spinnies: Spinnies, task: Task): Promise<void> {
    const start = Date.now()

    spinnies.add(task.title, {
      text: task.title,
    })

    try {
      await task.task()

      spinnies.succeed(task.title, {
        text: `${task.title}: ${Date.now() - start}ms`,
      })
    } catch (e) {
      spinnies.fail(task.title, {
        text: task.title,
      })
    }
  }

  async execTasks(tasks: Task[]): Promise<void> {
    const run = async () => {
      const start = Date.now()
      const spinnies = new Spinnies()
      await Promise.all(tasks.map(async (task) => ESBuildProgram.execTask(spinnies, task)))
      console.log(`构建完成: ${Date.now() - start}ms`)
    }

    if (!this.options.isWatch) {
      await remove(path.resolve(this.options.base, 'dist'))
      await run()
      return
    }

    const { pattern, options } = ESBuildProgram.getWatchOptions(this.options.base)

    await new Promise((resolve, reject) => {
      watch(pattern, options).on('error', reject).on('all', debounce(run, 10))
    })
  }
}
