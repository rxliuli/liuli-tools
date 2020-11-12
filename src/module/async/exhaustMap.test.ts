import { exhaustMap } from './exhaustMap'

describe('测试 exhaustMap', () => {
  it('基本示例', async () => {
    let i = 0
    const mockFn = jest.fn(async () => ++i)
    const fn = exhaustMap(mockFn)
    expect(await fn()).toBe(1)
    expect(await fn()).toBe(2)
    await Promise.all(
      Array(10)
        .fill(null)
        .map(() => fn()),
    )
    expect(i).toBe(3)
  })
})
