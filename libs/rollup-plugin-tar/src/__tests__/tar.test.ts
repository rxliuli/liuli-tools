import * as path from 'path'
import { createArchive } from '../util/createArchive'

it('测试 hello', async () => {
  const sourceDir = path.resolve('dist')
  const destPath = path.resolve('test.zip')
  await createArchive({ sourceDir: sourceDir, destPath: destPath })
})
