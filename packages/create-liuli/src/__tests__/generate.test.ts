import { fileURLToPath } from 'url'
import { beforeEach, expect, it } from 'vitest'
import { mkdirp, pathExists, remove } from '@liuli-util/fs-extra'
import path from 'path'
import { generate } from '../generate'
const tempPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.temp')

beforeEach(async () => {
  await remove(tempPath)
  await mkdirp(tempPath)
})

it('generate', async () => {
  await generate({
    cwd: tempPath,
    name: 'test',
    template: 'lib',
  })

  expect(await pathExists(path.resolve(tempPath, 'test/package.json'))).true
})

it('generate by org', async () => {
  await generate({
    cwd: tempPath,
    name: '@liuli-util/test',
    template: 'lib',
  })

  expect(await pathExists(path.resolve(tempPath, 'test/package.json'))).true
})

it('generate by overwrite', async () => {
  await mkdirp(path.resolve(tempPath, 'test'))

  await generate({
    cwd: tempPath,
    name: 'test',
    template: 'lib',
    overwrite: true,
  })

  expect(await pathExists(path.resolve(tempPath, 'test/package.json'))).true
})

it('generate cli', async () => {
  await generate({
    cwd: tempPath,
    name: '@liuli-util/test-cli',
    template: 'cli',
  })

  expect(await pathExists(path.resolve(tempPath, 'test-cli/package.json'))).true
})
