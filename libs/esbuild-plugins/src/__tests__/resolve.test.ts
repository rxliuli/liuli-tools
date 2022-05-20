import { build } from 'esbuild'
import { resolve } from '../resolve'

it('resolve', async () => {
  const res = await build({
    stdin: {
      contents: `
        import { uniq } from 'lodash'
        console.log(uniq([1,2,1]))
      `,
    },
    plugins: [resolve([['lodash', 'lodash-es']])],
    external: ['lodash-es'],
    format: 'esm',
    bundle: true,
    write: false,
  })
  console.log(res.outputFiles[0].text)
  expect(res.outputFiles[0].text.includes('lodash-es')).toBeTruthy()
})
