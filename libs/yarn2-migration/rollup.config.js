import typescript from 'rollup-plugin-typescript2'
import externals from 'rollup-plugin-node-externals'
import autoExternal from 'rollup-plugin-auto-external'
import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/index.js',
        sourcemap: true,
      },
      {
        format: 'esm',
        file: 'dist/index.esm.js',
        sourcemap: true,
      },
    ],
    plugins: [typescript(), autoExternal(), externals()],
  },
  {
    input: 'src/bin.ts',
    external: [
      'commander',
      'fs-extra',
      'inquirer',
      'lodash',
      // "ora",
      'yaml',
    ],
    output: [
      {
        format: 'cjs',
        file: 'dist/bin.js',
        sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      json(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          },
        },
      }),
      externals(),
    ],
  },
])
