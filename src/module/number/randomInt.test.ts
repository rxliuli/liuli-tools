import { randomInt } from './randomInt'
import { range } from '../array/range'

/**
 * @test {randomInt}
 */
describe('test randomInt', () => {
  it('test for normal sepecify min and max', () => {
    range(0, 100).forEach(v => {
      const num = randomInt(0, v)
      expect(num).toBeLessThanOrEqual(v)
      expect(num).toBeGreaterThanOrEqual(0)
    })
  })
  it('test for single sepecify max', () => {
    range(0, 100).forEach(v => expect(randomInt(v)).toBeLessThanOrEqual(v))
  })
})
