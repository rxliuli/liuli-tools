import { onceOfSameParam } from './onceOfSameParam'
import { randomInt } from '../number/randomInt'
import { repeatedCall } from './repeatedCall'
import { MemoryCacheEnum, MemoryCacheFactory } from '../cache/MemoryCache'

/**
 * @test {onceOfSameParam}
 */
describe('测试 onceOfSameParam', () => {
  it('简单示例', () => {
    let res = 0
    const mockFn = jest.fn((i: number) => res + i)
    const fn = onceOfSameParam(mockFn)
    expect(repeatedCall(3, fn, 0)).toSatisfyAll(i => i === 0)
    expect(repeatedCall(3, fn, 1)).toSatisfyAll(i => i === 1)
    expect(repeatedCall(3, fn, 3)).toSatisfyAll(i => i === 3)
    expect(mockFn.mock.calls.length).toBe(3)
  })
  it('测试异步函数', async () => {
    class User {
      constructor(public name: string, public age?: number) {}
    }
    // 模拟一个根据姓名获取 User 对象的值的 API
    const getById = async (name: any) => new User(name, randomInt(18))
    const fn = onceOfSameParam(getById)
    const res = await fn('rxliuli')
    expect(await fn('rxliuli')).toBe(res)
    // 相同的名字不会真正执行到服务端
    expect(await fn('rxliuli')).toBe(res)
    // 换个名字就不同了
    expect(await fn('ling_meng')).not.toBe(res)
  })
  describe('测试设置缓存策略', () => {
    let fn: jest.Mock<unknown, any[]> & {
      origin: jest.Mock<unknown, any[]>
      clear: (...keys: any[]) => void
    }

    beforeEach(() => {
      fn = onceOfSameParam(
        jest.fn(i => i),
        onceOfSameParam.identity,
        MemoryCacheFactory.create(MemoryCacheEnum.Lru, {
          limit: 3,
        }),
      )
    })
    it('基本示例', () => {
      repeatedCall(10, () => fn(1))
      expect(fn.mock.calls.length).toBe(1)
    })
    it('测试使用不同的参数', () => {
      repeatedCall(10, () => fn(1))
      repeatedCall(10, () => fn(2))
      repeatedCall(10, () => fn(3))
      expect(fn.mock.calls.length).toBe(3)
      //使用新的参数
      repeatedCall(10, () => fn(4))
      expect(fn.mock.calls.length).toBe(4)
    })
    it('测试缓存的删除策略', () => {
      repeatedCall(1, () => fn(1))
      repeatedCall(10, () => fn(2))
      repeatedCall(10, () => fn(3))
      //重新使用参数 1
      repeatedCall(1, () => fn(1))
      expect(fn.mock.calls.length).toBe(3)
      //使用新的参数 4，但被删除的是 2，而非 1，因为 2 才是最旧没有使用过的参数缓存
      repeatedCall(4, () => fn(4))
      expect(fn.mock.calls.length).toBe(4)
      fn(2)
      expect(fn.mock.calls.length).toBe(5)
    })
  })
})
