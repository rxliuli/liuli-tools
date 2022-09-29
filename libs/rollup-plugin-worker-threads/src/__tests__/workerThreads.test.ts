import { expect, it } from 'vitest'
import { rollup } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import * as path from 'path'
import { workerThreads } from '../workerThreads'
import { nodeResolve } from '@rollup/plugin-node-resolve'

it('测试 workerThreads', async () => {
  const bundle = await rollup({
    input: path.resolve(__dirname, 'typescript/index.ts'),

    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          },
        },
      }),
      nodeResolve(),
      workerThreads(),
    ],
  })

  await bundle.write({
    dir: path.resolve(__dirname, 'typescript/temp'),
    format: 'cjs',
  })
}, 100_000)
