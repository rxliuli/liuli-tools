import { calcPath } from './util'
import { name } from '../package.json'
import base from './rollup.config.base'

export default {
  ...base,
  output: {
    ...base.output,
    // 打包的文件
    file: calcPath(`../dist/${name}-es.js`),
    // 打包的格式，umd 支持 commonjs/amd/life 三种方式
    format: 'es',
  },
}
