import { OutputOptions, rollup } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { readJson } from 'fs-extra'
import * as path from 'path'

export async function build() {
  const output: OutputOptions[] = [
    {
      // 打包名称
      file: path.resolve('./dist/index.js'),
      format: 'cjs',
    },
    {
      // 打包名称
      file: path.resolve('./dist/index.esm.js'),
      format: 'esm',
    },
  ]
  const bundle = await rollup({
    // 入口文件
    input: path.resolve('./src/index.ts'),
    external: [
      ...Object.keys(
        (await readJson(path.resolve('./package.json'))).dependencies || {},
      ),
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      terser(), // minifies generated bundles
    ],
  })
  await Promise.all(
    output.map(async (config) => {
      await bundle.write(config)
    }),
  )

  await bundle.close()
}
