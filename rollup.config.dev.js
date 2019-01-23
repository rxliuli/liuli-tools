import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/main.js',
  output: {
    name: 'rx',
    file: 'dist/rx.js',
    format: 'umd',
    sourceMap: true
  },
  plugins: [resolve()]
}
