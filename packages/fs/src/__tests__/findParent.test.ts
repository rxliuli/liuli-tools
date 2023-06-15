import { expect, it } from 'vitest'
import { findParent } from '../findParent'
import path from 'path'
import { initTempPath } from '@liuli-util/test'
import { pathExists } from '../pathExists'

const tempPath = initTempPath(__filename)

it('findParent', async () => {
  const r = findParent(tempPath, (it) => path.basename(it) === '__tests__')
  expect(r).eq(__dirname)
})

it('findParent not found', async () => {
  const r = findParent(tempPath, (it) => it === 'not found')
  expect(r).null
})

it('findParent async', async () => {
  const r = await findParent(tempPath, async (it) => pathExists(path.resolve(it, 'package.json')))
  expect(r).eq(path.resolve(__dirname, '../../'))
})
