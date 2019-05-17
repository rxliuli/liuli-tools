import { blankToNull } from './blankToNull'

/**
 * @test {blankToNull} 测试 blankToNull
 */
describe('test blankToNull', () => {
  it('simple example', () => {
    expect(blankToNull('')).toBe(null)
    expect(blankToNull('a')).toBe('a')
  })
})
