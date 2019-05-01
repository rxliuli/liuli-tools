import { LocalStorageCache } from './LocalStorageCache'
import { wait } from '../function/wait'
import { repeatedCall } from '../function/repeatedCall'
import { TimeoutInfinite } from './CacheOption'

/**
 * @test {LocalStorageCache}
 */
describe('test LocalStorageCache', () => {
  it('simple example', () => {
    const cache = new LocalStorageCache()
    const k = '1'
    const v1 = '1'
    const v2 = '2'
    cache.add(k, v1)
    expect(cache.get(k)).toBe(v1)
    // 如果已经存在则无效
    cache.add(k, v2)
    expect(cache.get(k)).toBe(v1)
    expect(cache.touch(k)).toBe(v1)
    // 可以使用 set 强制覆盖
    cache.set(k, v2)
    expect(cache.get(k)).toBe(v2)
    cache.del(k)
    expect(cache.get(k)).toBe(null)
  })
  it('test timeout', async () => {
    const cache = new LocalStorageCache()
    const k = '1'
    const v1 = '1'
    // @ts-ignore
    cache.add(k, v1, {
      timeout: 100,
    })
    expect(cache.get(k)).toBe(v1)
    await wait(120)
    expect(cache.get(k)).toBe(null)
  })
  it('test touch', async () => {
    const cache = new LocalStorageCache()
    const k = '1'
    const v1 = '1'
    // @ts-ignore
    cache.add(k, v1, {
      timeout: 100,
    })
    await repeatedCall(4, async () => {
      await wait(50)
      expect(cache.touch(k)).toBe(v1)
    })
    expect(cache.touch(k)).toBe(v1)
  })
  it('test global default CacheOption', async () => {
    // @ts-ignore
    const cache = new LocalStorageCache({
      timeout: 100,
    })
    const k = '1'
    const v1 = '1'
    cache.add(k, v1)
    expect(cache.get(k)).toBe(v1)
    await wait(200)
    expect(cache.get(k)).toBe(null)
  })
  it('test use set CacheOption override global default CacheOption', async () => {
    // @ts-ignore
    const cache = new LocalStorageCache({
      timeout: 100,
    })
    const k = '1'
    const v1 = '1'
    cache.add(k, v1, {
      timeout: TimeoutInfinite,
    })
    expect(cache.get(k)).toBe(v1)
    await wait(200)
    expect(cache.get(k)).toBe(v1)
  })
})
