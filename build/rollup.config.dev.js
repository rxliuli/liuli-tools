import { eslint } from 'rollup-plugin-eslint'
import { calcPath } from './util'
import { name } from '../package.json'

export default {
  // 入口文件
  input: calcPath('../src/main.js'),
  output: {
    // 打包名称
    name,
    // 打包的文件
    file: calcPath(`../dist/${name}.js`),
    // 打包的格式，umd 支持 commonjs/amd/life 三种方式
    format: 'umd',
    // 启用代码映射，便于调试之用
    sourcemap: true
  },
  plugins: [
    // 引入 eslint 插件，必须在 babel 之前引入，因为 babel 编译之后的代码未必符合 eslint 规范，eslint 仅针对我们 [原本] 的代码
    eslint()
  ]
}
