import * as path from 'path'
import { FileLock } from '../util/FileLock'
import { AsyncArray } from '../../../utils'
import { wait } from '../util/wait'

describe('测试文件锁', () => {
  const tempPath = path.resolve(__dirname, '.temp/test.lock')
  it('基本示例', async () => {
    const fileLock = new FileLock(tempPath)
    expect(await fileLock.lock()).toBeTruthy()
    expect(await fileLock.lock()).toBeFalsy()
    await fileLock.unlock()
    expect(await fileLock.lock()).toBeTruthy()
    await fileLock.unlock()
  })
  it('测试并发调用', async () => {
    const start = Date.now()
    await AsyncArray.forEach(Array(10).fill(0), async () => {
      const fileLock = new FileLock(tempPath)
      await wait(() => fileLock.lock())
      await wait(100)
      await fileLock.unlock()
    })
    const time = Date.now() - start
    expect(time).toBeLessThan(3000)
  })
})
