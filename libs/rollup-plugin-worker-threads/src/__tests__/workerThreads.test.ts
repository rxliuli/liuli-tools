import { rollup } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import * as path from 'path'
import { workerThreads } from '../workerThreads'

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
      // worker({
      //   plugins: [typescript()],
      // }),
      workerThreads(),
    ],
  })
  await bundle.write({
    dir: path.resolve(__dirname, 'typescript/temp'),
    format: 'cjs',
  })
}, 100_000)
