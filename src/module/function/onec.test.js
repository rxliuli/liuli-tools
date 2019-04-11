import { onec } from './onec'

/**
 * @test {onec}
 */
describe('test onec', () => {
  it('test multiple calls plus one', () => {
    const fn = i => i + 1
    const add = onec(fn)
    expect(add(0)).toBe(1)
    expect(add(1)).toBe(1)
    expect(add(2)).toBe(1)
  })

  it('test async function', async () => {
    const fn = async i => i - 1
    const add = onec(fn)
    expect(await add(3)).toBe(2)
    expect(await add(2)).toBe(2)
    expect(await add(1)).toBe(2)
  })
})
