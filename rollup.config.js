import sucrase from '@rollup/plugin-sucrase'
import visualizer from 'rollup-plugin-visualizer'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/index.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: `dist/index.js`,
      format: 'umd',
      sourcemap: true,
      name: 'rx',
    },
  ],
  plugins: [
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript'],
    }),
    visualizer({
      filename: 'docs/stats.html',
    }),
  ],
}
