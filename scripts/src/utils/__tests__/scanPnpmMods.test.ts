import { expect, it } from 'vitest'
import { findPnpmRootPath } from '../findPnpmRootPath'
import { scanPnpmMods } from '../scanPnpmMods'

it('basic', async () => {
  const rootPath = await findPnpmRootPath()
  const res = await scanPnpmMods(rootPath)
  expect(res.includes('scripts')).toBeTruthy()
})
