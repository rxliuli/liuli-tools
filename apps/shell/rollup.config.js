import typescript from 'rollup-plugin-typescript2'
import externals from 'rollup-plugin-node-externals'
import { terser } from 'rollup-plugin-terser'
import shebang from 'rollup-plugin-add-shebang'

const external = ['commander', 'fs-extra']

export default [
  {
    input: './src/index.ts',
    plugins: [typescript(), externals(), terser()],
    external: external,
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
  ...['bin', 'mv', 'rm', 'mkdir', 'cp'].map((cmd) => ({
    input: `src/${cmd}.ts`,
    external: external,
    output: {
      file: `dist/${cmd}.js`,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          },
        },
      }),
      externals(),
      terser(),
      shebang({
        include: [`./dist/${cmd}.js`],
      }),
    ],
  })),
]
