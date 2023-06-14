import { expect, it } from 'vitest'
import { build } from 'esbuild'
import { nodeExternal } from '../nodeExternal'

it('nodeExternal', async () => {
  const res = await build({
    stdin: {
      contents: `
        import { path } from 'node:path'
        console.log(path.resolve(__dirname))
      `,
    },

    plugins: [nodeExternal()],
    format: 'esm',
    bundle: true,
    write: false,
  })

  console.log(res.outputFiles[0].text)
  expect(res.outputFiles[0].text.includes('import { path } from "path"')).toBeTruthy()
})
