import { BuildCache } from '../BuildCache'
import * as path from 'path'
import { mkdir, remove } from 'fs-extra'

describe('测试 BuildCache', () => {
  const rootPath = path.resolve(__dirname, '.temp/')
  beforeEach(async () => {
    await remove(rootPath)
    await mkdir(rootPath)
  })

  it('基本示例', async () => {
    const buildCache = new BuildCache(rootPath)
    expect(await buildCache.get('build')).toEqual([])
    const workspaces = [{ cwd: rootPath, changed: [], lastCommit: null }]
    await buildCache.set('build', workspaces)
    expect(await buildCache.get('build')).toEqual(workspaces)
    expect(await buildCache.get('initialize')).toEqual([])
  })
})
