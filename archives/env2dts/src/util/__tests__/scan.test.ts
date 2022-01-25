import { scan } from '../scan'
import * as path from 'path'
import { mkdirp, remove, writeFile } from 'fs-extra'

describe('测试 scan', () => {
  const dir = path.resolve(__dirname, 'temp/scan')
  beforeAll(async () => {
    await remove(dir)
    await mkdirp(dir)
    // language=DotEnv
    await writeFile(path.resolve(dir, '.env'), 'PORT=3000\n')
    // language=DotEnv
    await writeFile(path.resolve(dir, '.env.development'), 'PORT=3000\nENV=dev\nBASE_URL=http://localhost:3000')
    // language=DotEnv
    await writeFile(path.resolve(dir, '.env.production'), 'PORT=3000\nENV=prod\n')
  })
  it('基本示例', async () => {
    expect(await scan(dir)).toEqual(['PORT', 'ENV', 'BASE_URL'])
  })
  it('测试', async () => {
    await mkdirp(path.resolve(dir, 'nest'))
    await writeFile(path.resolve(dir, 'nest', '.env.test'), 'TEST=true')
    expect((await scan(dir)).includes('TEST')).toBeFalsy()
  })
})
