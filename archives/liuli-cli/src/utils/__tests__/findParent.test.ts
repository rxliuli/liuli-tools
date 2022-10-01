import { fileURLToPath } from 'url'
import { expect, it, describe } from 'vitest'
import { findParent } from '../findParent'
import { mkdir, remove } from '@liuli-util/fs-extra'
import path from 'path'

describe('测试 findParent', () => {
  it('基本示例', async () => {
    const tempPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'temp')
    await mkdir(tempPath)
    expect(findParent(tempPath, (dir) => dir === path.dirname(fileURLToPath(import.meta.url)))).toBe(
      path.dirname(fileURLToPath(import.meta.url)),
    )
    await remove(tempPath)
  })

  it('测试找不到的情况', () => {
    expect(findParent(path.dirname(fileURLToPath(import.meta.url)), () => false)).toBeNull()
  })
})
