import { expect, it } from 'vitest'
import { build } from 'esbuild'
import { env } from '../env'

it('基本示例', async () => {
  const res = await build({
    stdin: {
      contents: `export const NodeEnv = import.meta.env.NODE_ENV`,
    },

    plugins: [
      env({
        import: true,
      }),
    ],

    write: false,
  })

  expect(res.outputFiles[0].text.includes('test')).toBeTruthy()
})
