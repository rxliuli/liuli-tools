import { fileURLToPath } from 'url'
import path from 'path'
import { expect, it } from 'vitest'
import { build } from 'esbuild'
import { raw } from '../raw'

it('raw', async () => {
  const res = await build({
    stdin: {
      contents: `
        import readme from '../../README.md?raw'
        console.log(readme)
      `,

      resolveDir: path.dirname(fileURLToPath(import.meta.url)),
    },

    plugins: [raw()],
    bundle: true,
    write: false,
  })

  console.log(res.outputFiles[0].text)
  expect(res.outputFiles[0].text.includes('@liuli-util/esbuild-plugins')).toBeTruthy()
})
