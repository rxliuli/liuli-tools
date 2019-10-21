import typescript from 'rollup-plugin-typescript2'
import { calcPath } from './util'

export default {
  // 入口文件
  input: calcPath('../src/index.ts'),
  output: {
    // 打包名称
    name: 'rx',
    // 启用代码映射，便于调试之用
    sourcemap: true,
  },
  plugins: [
    typescript({
      exclude: ['./dist', './src/**/*.test.ts'],
    }),
  ],
}
