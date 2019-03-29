import { randomInt } from './randomInt'

test('test randomInt', () => {
  const min = 0
  const max = 10
  for (let i = 0; i < 100; i++) {
    const num = randomInt(min, max)
    expect(num).toBeLessThanOrEqual(max)
    expect(num).toBeGreaterThanOrEqual(min)
  }
})
