import { onec } from './onec'
import { repeatedCall } from './repeatedCall'

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
  it('test this', async function () {
    this.i = 3
    const add = async () => --this.i
    const fn = onec(add)
    await Promise.all(repeatedCall(3, fn))
    expect(await fn()).toBe(2)
    await Promise.all(repeatedCall(3, fn))
    expect(this.i).toBe(2)
  })
  it('test bind this', async function () {
    const obj = { i: 3 }
    const add = async function () {
      return --this.i
    }
    const fn = onec(add).bind(obj)
    await Promise.all(repeatedCall(3, fn))
    expect(obj.i).toBe(2)
  })
})
