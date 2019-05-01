import { isNullOrUndefined } from './isNullOrUndefined'

/**
 * @test {isNullOrUndefined}
 */
describe('test isNullOrUndefined', () => {
  it('simple example', () => {
    expect(isNullOrUndefined(undefined)).toBe(true)
    expect(isNullOrUndefined(null)).toBe(true)
    expect(isNullOrUndefined('a')).toBe(false)
    expect(isNullOrUndefined('')).toBe(false)
    expect(isNullOrUndefined([])).toBe(false)
    expect(isNullOrUndefined({})).toBe(false)
  })
})
