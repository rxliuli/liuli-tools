import { expect, it, describe, vi } from 'vitest'
import { repeatedCall } from '../repeatedCall'

describe('测试 repeatedCall', () => {
  const len = 5

  it('基本示例', () => {
    let i = 1
    expect(repeatedCall(() => i++, len)).toEqual([1, 2, 3, 4, 5])
    expect(i).toBe(6)
  })

  it('测试异步函数', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const mockFn = vi.fn(async () => {})

    await repeatedCall(mockFn, len)
    expect(mockFn.mock.calls.length).toBe(len)
  })

  it('测试传入的下标参数', () => {
    const fn = vi.fn()
    repeatedCall(fn, len)
    expect(fn.mock.calls.map(([i]) => i)).toEqual(
      Array(len)
        .fill(0)
        .map((_, i) => i),
    )
  })
})
