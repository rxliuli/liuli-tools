import { build } from 'esbuild'
import { autoExternal } from '../autoExternal'

it('autoExternal', async () => {
  const res = await build({
    stdin: {
      contents: `
        import { build } from 'esbuild'
        console.log(build)
      `,
    },
    plugins: [autoExternal()],
    format: 'esm',
    bundle: true,
    write: false,
  })
  console.log(res.outputFiles[0].text)
  expect(res.outputFiles[0].text.includes('import { build } from "esbuild"')).toBeTruthy()
})
