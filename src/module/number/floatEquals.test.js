import { floatEquals } from './floatEquals'

/**
 * @test {floatEquals}
 */
describe('test floatEquals', () => {
  it('simple example', () => {
    expect(floatEquals(0.1 + 0.2, 0.3)).toBeTrue()
    expect(floatEquals(0.1 + 0.2, 0.3)).toBeTrue()
    expect(floatEquals(0.1 + 0.2, 0.31)).toBeFalse()
  })
})
