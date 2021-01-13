import { repeatedCall } from '../repeatedCall'

/**
 * @test {repeatedCall}
 */
describe('测试 repeatedCall', () => {
  const len = 5
  it('基本示例', () => {
    let i = 1
    expect(repeatedCall(() => i++, len)).toEqual([1, 2, 3, 4, 5])
    expect(i).toBe(6)
  })
  it('async function', async () => {
    const mockFn = jest.fn(async () => {})
    await repeatedCall(mockFn, len)
    expect(mockFn.mock.calls.length).toBe(len)
  })
})
