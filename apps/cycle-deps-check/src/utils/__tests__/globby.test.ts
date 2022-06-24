import path from 'path'
import { globby } from '../globby'

it('globby', async () => {
  const name = path.basename(__filename)
  const res = await globby(['*.ts', `!${path.basename(__filename)}`], { cwd: __dirname })
  console.log(res)
  expect(res.includes(name)).toBeFalsy()
})
