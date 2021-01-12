import { isFloat } from './isFloat'

/**
 * @test {isFloat}
 */
describe('test isFloat', () => {
  it('test isFloat', () => {
    expect(isFloat('5')).toBe(true)
    expect(isFloat('5.6')).toBe(true)
    expect(isFloat('5.a')).toBe(false)
  })
})
