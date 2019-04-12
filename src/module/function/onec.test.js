import { onec } from './onec'

/**
 * @test {onec}
 */
describe('test onec', () => {
  it('test multiple calls plus one', () => {
    const add = i => i + 1
    const fn = onec(add)
    expect(fn(0)).toBe(1)
    expect(fn(1)).toBe(1)
    expect(fn(2)).toBe(1)
  })
  it('test async function', async () => {
    const add = async i => i - 1
    const fn = onec(add)
    expect(await fn(3)).toBe(2)
    expect(await fn(2)).toBe(2)
    expect(await fn(1)).toBe(2)
  })
  it('test this', async () => {
    const add = async i => i - 1
    const fn = onec(add)
    expect(await fn(3)).toBe(2)
    expect(await fn(2)).toBe(2)
    expect(await fn(1)).toBe(2)
  })
})
