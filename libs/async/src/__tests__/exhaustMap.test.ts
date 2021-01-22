import { exhaustMap } from '../exhaustMap'
import { Expect, repeatedCall } from '@liuli-util/test'

describe('测试 exhaustMap', () => {
  it('基本示例', async () => {
    let i = 0
    const mockFn = jest.fn(async () => ++i)
    const fn = exhaustMap(mockFn)
    expect(await fn()).toBe(1)
    expect(await fn()).toBe(2)
    await repeatedCall(fn, 10)
    expect(i).toBe(3)
  })
  it('测试类型', async () => {
    const res = await exhaustMap(async () => 1)()
    expect(res as Expect<typeof res, number | null>).toBe(1)
    type S = Expect<typeof res, number>
    expect(res as S).toBe(1)
  })
  it('测试只有第一次调用会返回结果', async () => {
    const fn = jest.fn(exhaustMap(async () => 1))
    await repeatedCall(async (i) => {
      const res = await fn()
      if (i === 0) {
        expect(res).toBe(1)
      } else {
        expect(res).toBeUndefined()
      }
    }, 10)
  })
})
