import { Command } from 'commander'
import { rollup } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { readJson } from 'fs-extra'

const builder = new Command('build')
builder.description('打包').action(async () => {
  await rollup({
    // 入口文件
    input: './src/bin.ts',
    output: [
      {
        // 打包名称
        file: './dist/index.js',
        format: 'cjs',
      },
      {
        // 打包名称
        file: './dist/index.esm.js',
        format: 'esm',
      },
    ],
    external: [
      ...Object.keys((await readJson('package.json')).dependencies || {}),
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      terser(), // minifies generated bundles
    ],
  })
})

export { builder }
