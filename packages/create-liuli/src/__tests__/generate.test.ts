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

it('generate by force', async () => {
  await mkdirp(path.resolve(tempPath, 'test'))

  await generate({
    cwd: tempPath,
    name: 'test',
    template: 'lib',
    force: true,
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

it('generate chrome plugin', async () => {
  await generate({
    cwd: tempPath,
    name: '@liuli-util/test-chrome-plugin',
    template: 'react-chrome-plugin',
  })
  expect(await pathExists(path.resolve(tempPath, 'test-chrome-plugin/package.json'))).true
})

it('react webapp', async () => {
  await generate({
    cwd: tempPath,
    name: '@liuli-util/test-react-webapp',
    template: 'react-chrome-plugin',
  })
  expect(await pathExists(path.resolve(tempPath, 'test-react-webapp/package.json'))).true
  expect(await pathExists(path.resolve(tempPath, 'test-react-webapp/tailwind.config.js'))).true
})
