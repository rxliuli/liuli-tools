import { randomInt } from './randomInt'

/**
 * @test {randomInt}
 */
describe('test randomInt', () => {
  it('test for normal sepecify min and max', () => {
    Array(100)
      .fill(0)
      .forEach((_v, i) => {
        const num = randomInt(0, i)
        expect(num).toBeLessThanOrEqual(i)
        expect(num).toBeGreaterThanOrEqual(0)
      })
  })
  it('test for no sepecify every paramater', () => {
    expect(() => randomInt()).toThrowError('非法参数，必须指定最大值')
  })
  it('test for single sepecify max', () => {
    Array(100)
      .fill(0)
      .forEach((_v, i) => {
        expect(randomInt(i)).toBeLessThanOrEqual(i)
      })
  })
})
