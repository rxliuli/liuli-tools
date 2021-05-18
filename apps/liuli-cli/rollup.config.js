import path from 'path'
import { readJsonSync } from 'fs-extra'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

/**
 * 此处不使用 @liuli-util/rollup-plugin-cli-banner 的原因在于避免循环引用
 * @return {{generateBundle(*, *=): void}}
 */
export function cliBanner() {
  const hashbang = '#!/usr/bin/env node'

  return {
    generateBundle(code, bundle) {
      Object.entries(bundle).forEach(([_name, options]) => {
        options.code = hashbang + '\n' + options.code
      })
    },
  }
}

const external = [
  ...Object.keys(
    readJsonSync(path.resolve('./package.json')).dependencies || {},
  ),
]
export default [
  {
    output: [
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
    ],
    // 入口文件
    input: path.resolve('./src/index.ts'),
    external,
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      terser(), // minifies generated bundles
    ],
  },
  {
    // 入口文件
    input: './src/bin.ts',
    output: [
      {
        // 打包名称
        file: './dist/bin.js',
        format: 'cjs',
      },
    ],
    external,
    plugins: [
      typescript(),
      cliBanner(),
      // terser(), // minifies generated bundles
    ],
  },
]
