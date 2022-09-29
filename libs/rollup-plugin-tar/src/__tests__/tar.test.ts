import { expect, it, beforeEach } from 'vitest'
import { remove, mkdirp, writeFile, pathExists } from 'fs-extra'
import * as path from 'path'
import { createArchive } from '../util/createArchive'
const testPath = path.resolve(__dirname, '.temp')

beforeEach(async () => {
  await remove(testPath)
  await mkdirp(testPath)
})

it('测试 hello', async () => {
  await writeFile(path.resolve(testPath, 'test.txt'), 'hello world')
  const destPath = path.resolve(testPath, 'test.zip')

  await createArchive({
    sourceDir: testPath,
    destPath: destPath,
  })

  expect(await pathExists(destPath)).toBeTruthy()
})
