import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

export default {
  // 入口文件
  input: './src/index.ts',
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
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    terser(), // minifies generated bundles
  ],
}
