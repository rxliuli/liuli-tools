import { around } from './around'

describe('测试 around', () => {
  it('基本示例', () => {
    const fn = around(
      (i: number) => (i + 1).toString(),
      (f, i) => Math.floor(Number.parseInt(f(i * 2)) / 2),
    )
    expect(fn(1)).toBe(1)
  })
})
