import { trySometimeParallel } from './trySometimeParallel'

/**
 * @test {trySometimeParallel}
 */
describe('test trySometimeParallel', () => {
  it('simple example', async () => {
    const get = async (i: any) => i
    get.rx = 'rx'
    // @ts-ignore
    const fn = trySometimeParallel(get)
    expect(await fn(1)).toBe(1)
    // 不会丢失原函数的属性
    expect(fn.rx).toBe('rx')
  })
  it('test error', async () => {
    let num = 0
    // 模拟前两次调用都挂掉了
    const get = async (i: any) => {
      num++
      if (num < 3) {
        throw num
      }
      return i
    }
    // 重复调用两次
    const fn = trySometimeParallel(get, 2)
    expect(fn(0)).rejects.toBe(2)
  })
  it('test error and get the correct result', async () => {
    let num = 0
    // 模拟前两次调用都挂掉了
    const get = async (i: any) => {
      num++
      if (num < 3) {
        throw num
      }
      return i
    }
    // 调用3次
    const fn = trySometimeParallel(get, 3)
    await expect(fn(0)).resolves.toBe(0)
    expect(num).toBe(3)
  })
  it('test custom error check function', async () => {
    // 模拟前两次调用都挂掉了
    const get = async (i: any) => i
    // 调用3次
    const fn = trySometimeParallel(get, 3, i => i > 0)
    expect(fn(1)).resolves.toBe(1)
    expect(fn(0)).rejects.toBe(0)
  })
  it('Test the actual number of calls', async () => {
    let num = 0
    // 模拟前两次调用都挂掉了
    const get = async (i: any) => {
      num++
      if (num < 2) {
        throw num
      }
      return i
    }
    // 最多重复 3 次
    const fn = trySometimeParallel(get, 3)
    await expect(fn(0)).resolves.toBe(0)
    // 实际执行了 3 次，即便第二次就已经成功了
    expect(num).toBe(3)
  })
})
