import * as path from 'path'
import { OutputOptions, rollup } from 'rollup'
import { remove, unlink } from 'fs-extra'
import typescript from 'rollup-plugin-typescript2'

export class TypeScriptConfigFile {
  constructor(
    private readonly config: { configFile: string; configRoot: string },
  ) {}

  /**
   * 编译 ts 的配置文件为 js
   */
  async bundle() {
    const bundleConfigFilePath = path.resolve(this.config.configFile + '.js')
    const output: OutputOptions[] = [
      { file: bundleConfigFilePath, format: 'cjs', exports: 'auto' },
    ]
    const bundle = await rollup({
      input: path.resolve(this.config.configFile),
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: 'ESNext',
              sourceMap: false,
              declaration: false,
              declarationMap: false,
            },
          },
        }),
      ],
    })
    await Promise.all(
      output.map(async (config) => {
        await bundle.write(config)
      }),
    )

    await bundle.close()

    return bundleConfigFilePath
  }

  /**
   * 读取 typescript 格式的配置文件
   * 注：不能在配置文件中引用其他 ts 文件
   */
  async load() {
    const bundleConfigFile = await this.bundle()
    const res = (await TypeScriptConfigFile.evalConfig(bundleConfigFile))
      .default
    await unlink(bundleConfigFile)
    await remove(bundleConfigFile)
    return res
  }

  static async evalConfig(configFile: string) {
    return await import(configFile)
  }
}
