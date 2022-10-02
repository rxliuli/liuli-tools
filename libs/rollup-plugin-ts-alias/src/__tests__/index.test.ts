import { expect, it } from 'vitest'
import { rollup } from 'rollup'
import { tsAlias } from '..'
import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

it('tsAlias', async () => {
  const build = await rollup({
    input: path.resolve(__dirname, './assets/index.ts'),
    plugins: [
      typescript(),
      // 需要放在其他 resolve 之前以重写 import
      tsAlias({ includes: ['@liuli-util/'], debug: true }),
      nodeResolve(),
    ],
    // external: ['@liuli-util/async'],
  })
  const r = await build.generate({ format: 'esm' })
  expect(r.output[0].code.includes('await wait(1000)')).toBeTruthy()
})
