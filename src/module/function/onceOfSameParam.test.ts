import { onceOfSameParam } from './onceOfSameParam'
import { randomInt } from '../number/randomInt'

/**
 * @test {onceOfSameParam}
 */
describe('test onceOfSameParam', () => {
  it('simple example', () => {
    const add = (i: number) => i + Date.now()
    const fn = onceOfSameParam(add)
    const res = fn(0)
    expect(fn(0)).toBe(res)
    expect(fn(0)).toBe(res)
    const res1 = fn(1)
    expect(fn(1)).toBe(res1)
    expect(fn(1)).toBe(res1)
  })
  class User {
    constructor(public name: string, public age?: number) {}
  }
  it('test simple async function', async () => {
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
