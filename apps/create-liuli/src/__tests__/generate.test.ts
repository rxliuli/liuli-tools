import { beforeEach, expect, it } from 'vitest'
import { mkdirp, pathExists, remove } from '@liuli-util/fs-extra'
import path from 'path'
import { generate } from '../generate'
const tempPath = path.resolve(__dirname, '.temp')

beforeEach(async () => {
  await remove(tempPath)
  await mkdirp(tempPath)
})

it('generate', async () => {
  await generate({
    cwd: tempPath,
    name: 'test',
    type: 'lib',
  })

  expect(await pathExists(path.resolve(tempPath, 'test/package.json'))).toBeTruthy()
})

it('generate by org', async () => {
  await generate({
    cwd: tempPath,
    name: '@liuli-util/test',
    type: 'lib',
  })

  expect(await pathExists(path.resolve(tempPath, 'test/package.json'))).toBeTruthy()
})

it('generate by overwrite', async () => {
  await mkdirp(path.resolve(tempPath, 'test'))

  await generate({
    cwd: tempPath,
    name: 'test',
    type: 'lib',
    overwrite: true,
  })

  expect(await pathExists(path.resolve(tempPath, 'test/package.json'))).toBeTruthy()
})
