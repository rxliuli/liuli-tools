import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { tar } from '@liuli-util/rollup-plugin-tar'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.js', format: 'cjs', sourcemap: true }],
    plugins: [
      typescript(),
      tar({
        sourceDir: 'dist',
        destPath: 'test.tar',
      }),
    ],
  },
])
