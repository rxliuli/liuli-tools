import { onceOfSameParam } from './onceOfSameParam'
import { randomInt } from '../number/randomInt'
import { repeatedCall } from './repeatedCall'

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
    expect(repeatedCall(3, fn, 1)).toSatisfyAll(i => i === 3)
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
})
