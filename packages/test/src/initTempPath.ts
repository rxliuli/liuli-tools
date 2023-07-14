import { mkdir, rm } from 'fs/promises'
import path from 'path'
import { beforeEach } from 'vitest'

type Promisify<T> = T | Promise<T>

/**
 * 初始化测试目录
 * @param __filename
 * @returns
 */
export function initTempPath(__filename: string, hook?: () => Promisify<void>) {
  const tempPath = path.resolve(path.dirname(__filename), '.temp', path.basename(__filename))
  beforeEach(async () => {
    await rm(tempPath, { recursive: true, force: true })
    await mkdir(tempPath, { recursive: true })
    hook?.()
  })
  return tempPath
}
