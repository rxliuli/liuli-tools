import { findParent } from '../findParent'
import { mkdir, remove } from '@liuli-util/fs-extra'
import path from 'path'

describe('测试 findParent', () => {
  it('基本示例', async () => {
    const tempPath = path.resolve(__dirname, 'temp')
    await mkdir(tempPath)
    expect(findParent(tempPath, (dir) => dir === __dirname)).toBe(__dirname)
    await remove(tempPath)
  })

  it('测试找不到的情况', () => {
    expect(findParent(__dirname, () => false)).toBeNull()
  })
})
