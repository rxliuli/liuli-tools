import { after } from './after'

describe('测试 after', () => {
  it('基本示例', () => {
    const fn = after(
      (i: number) => i + 1,
      i => i * 2,
    )
    expect(fn(1)).toBe(4)
  })
})
