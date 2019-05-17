import { blankToNull } from './blankToNull'

/**
 * @test {blankToNull} 测试 blankToNull
 */
describe('test blankToNull', () => {
  /** @test blankToNull('') */
  it('test blank', () => {
    expect(blankToNull('')).toBe(null)
  })
  /** @test blankToNull('a') */
  it('test a', () => {
    expect(blankToNull('a')).toBe('a')
  })
})
