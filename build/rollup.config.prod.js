import babel from 'rollup-plugin-babel'
// 注意，这里引入需要使用 { uglify } 而非 uglify，因为 uglify 导出自身时使用的是 exports.uglify
import { uglify } from 'rollup-plugin-uglify'
import { eslint } from 'rollup-plugin-eslint'
import { calcPath } from './util'
import dev from './rollup.config.dev'
import { name } from '../package.json'

export default [
  dev,
  {
    // 入口文件
    input: calcPath('../src/main.js'),
    output: {
      // 打包名称
      name,
      // 打包的文件
      file: calcPath(`../dist/${name}.min.js`),
      // 打包的格式，umd 支持 commonjs/amd/life 三种方式
      format: 'umd'
    },
    plugins: [
      // 引入 eslint 插件，必须在 babel 之前引入，因为 babel 编译之后的代码未必符合 eslint 规范，eslint 仅针对我们 [原本] 的代码
      eslint(),
      // 引入 babel 插件
      babel({
        exclude: calcPath('../node_modules/**')
      }),
      // js 压缩插件，需要在最后引入
      uglify()
    ]
  }
]
