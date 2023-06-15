import { mkdir, rm } from 'fs/promises'
import path from 'path'
import { beforeEach } from 'vitest'

/**
 * 初始化测试目录
 * @param __filename
 * @returns
 */
export function initTempPath(__filename: string) {
  const tempPath = path.resolve(path.dirname(__filename), '.temp', path.basename(__filename))
  beforeEach(async () => {
    await rm(tempPath, { recursive: true, force: true })
    await mkdir(tempPath, { recursive: true })
  })
  return tempPath
}
