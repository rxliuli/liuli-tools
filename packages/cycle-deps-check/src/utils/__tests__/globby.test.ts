import { fileURLToPath } from 'url'
import { expect, it } from 'vitest'
import path from 'path'
import { globby } from '../globby'

it('globby', async () => {
  const name = path.basename(__filename)

  const res = await globby(['*.ts', `!${path.basename(__filename)}`], {
    cwd: path.dirname(fileURLToPath(import.meta.url)),
  })

  console.log(res)
  expect(res.includes(name)).toBeFalsy()
})
