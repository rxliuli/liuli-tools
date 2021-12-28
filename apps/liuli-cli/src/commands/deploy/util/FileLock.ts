import { close, open, remove } from 'fs-extra'
import path from 'path'

export class FileLock {
  constructor(private readonly lockFilePath: string) {}

  private lockId?: number

  /**
   * 加锁
   */
  async lock(): Promise<boolean> {
    try {
      this.lockId = await open(path.resolve(this.lockFilePath), 'wx')
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * 解锁
   */
  async unlock(): Promise<void> {
    if (!this.lockId) {
      throw new Error('未加锁')
    }
    await remove(path.resolve(this.lockFilePath))
    close(this.lockId)
  }
}
