import typescript from 'rollup-plugin-typescript2'
import tslint from 'rollup-plugin-tslint'
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
    // 引入 tslint 插件，必须在 babel 之前引入，因为 babel 编译之后的代码未必符合 tslint 规范，tslint 仅针对我们 [原本] 的代码
    tslint(),
    typescript(),
  ],
}
