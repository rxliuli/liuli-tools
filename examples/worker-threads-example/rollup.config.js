import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { workerThreads } from 'rollup-plugin-worker-threads'

export default defineConfig([
  {
    input: ['src/index.ts', 'src/mixingThread.ts'],
    output: [
      { dir: 'dist/esm', format: 'esm' },
      { dir: 'dist/cjs', format: 'cjs' },
    ],
    plugins: [typescript(), workerThreads()],
  },
])
