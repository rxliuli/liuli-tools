import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
const path = require('path')

module.exports = {
  input: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    name: 'rx',
    file: path.resolve(__dirname, 'dist', 'rx.js'),
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}
