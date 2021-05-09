import * as path from 'path'
import { OutputOptions, rollup } from 'rollup'
import { remove, unlink } from 'fs-extra'
import typescript from 'rollup-plugin-typescript2'

/**
 * 编译 ts 的配置文件为 js
 * @param configFile
 * @param configRoot
 */
export async function bundleTSConfig(configFile: string, configRoot: string) {
  const bundleConfigFilePath = path.resolve(configFile + '.js')
  const output: OutputOptions[] = [
    {
      // 打包名称
      file: bundleConfigFilePath,
      format: 'cjs',
    },
  ]
  const bundle = await rollup({
    // 入口文件
    input: path.resolve(configFile),
    plugins: [
      typescript({
        tsconfig: path.resolve(configRoot, './tsconfig.json'),
        tsconfigOverride: {
          compilerOptions: {
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

export async function evalConfig(configFile: string) {
  return await import(configFile)
}

/**
 * 读取 typescript 格式的配置文件
 * 注：不能在配置文件中引用其他 ts 文件
 */
export async function loadTSConfig(
  configFile: string,
  configRoot: string = process.cwd(),
) {
  const bundleConfigFile = await bundleTSConfig(
    path.resolve(configFile),
    configRoot,
  )
  const res = await evalConfig(bundleConfigFile)
  await unlink(bundleConfigFile)
  await remove(bundleConfigFile)
  return res
}
