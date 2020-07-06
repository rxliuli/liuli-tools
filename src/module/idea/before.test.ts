import { before } from './before'

describe('测试 before', () => {
  it('基本示例', () => {
    const fn = before(
      (i: number) => i + 1,
      (f, i) => f(i * 2),
    )
    expect(fn(1)).toBe(3)
  })
})
