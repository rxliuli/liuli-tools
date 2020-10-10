import { once } from './once'
import { repeatedCall } from './repeatedCall'

/**
 * @test {once}
 */
describe('测试 once', () => {
  it('简单示例 +1', () => {
    const mockFn = jest.fn((i: number) => i + 1)
    const fn = once(mockFn)
    expect(fn(0)).toBe(1)
    expect(fn(1)).toBe(1)
    expect(fn(2)).toBe(1)
    expect(mockFn.mock.calls.length).toBe(1)
  })
  it('测试异步函数', async () => {
    const add = async (i: number) => i - 1
    const fn = once(add)
    expect(await fn(3)).toBe(2)
    expect(await fn(2)).toBe(2)
    expect(await fn(1)).toBe(2)
  })
  class Model {
    public i = 3
    async add() {
      return --this.i
    }
  }
  it('测试 this', async function () {
    const model = new Model()
    const mockFn = jest.fn(model.add)
    const fn = once(mockFn.bind(model))
    await Promise.all(repeatedCall(3, fn))
    expect(await fn()).toBe(2)
    expect(model.i).toBe(2)
  })
  it('测试手动 bind this', async function () {
    const obj = {
      i: 3,
    }
    const model = new Model()
    const fn = once(model.add).bind(obj)
    await Promise.all(repeatedCall(3, fn))
    expect(model.i).toBe(3)
    expect(obj.i).toBe(2)
  })
})
