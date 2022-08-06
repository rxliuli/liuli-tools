import { build } from 'esbuild'
import { raw } from '../raw'

it('raw', async () => {
  const res = await build({
    stdin: {
      contents: `
        import readme from '../../README.md?raw'
        console.log(readme)
      `,
      resolveDir: __dirname,
    },
    plugins: [raw()],
    bundle: true,
    write: false,
  })
  console.log(res.outputFiles[0].text)
  expect(res.outputFiles[0].text.includes('@liuli-util/esbuild-plugins')).toBeTruthy()
})
