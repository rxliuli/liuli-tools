import { once } from './once'
import { repeatedCall } from './repeatedCall'

/**
 * @test {once}
 */
describe('test once', () => {
  it('test multiple calls plus one', () => {
    const add = (i: number) => i + 1
    const fn = once(add)
    expect(fn(0)).toBe(1)
    expect(fn(1)).toBe(1)
    expect(fn(2)).toBe(1)
  })
  it('test async function', async () => {
    const add = async (i: number) => i - 1
    const fn = once(add)
    expect(await fn(3)).toBe(2)
    expect(await fn(2)).toBe(2)
    expect(await fn(1)).toBe(2)
  })
  it('test this', async function() {
    // @ts-ignore
    this.i = 3
    // @ts-ignore
    const add = async () => --this.i
    const fn = once(add)
    await Promise.all(repeatedCall(3, fn))
    expect(await fn()).toBe(2)
    await Promise.all(repeatedCall(3, fn))
    // @ts-ignore
    expect(this.i).toBe(2)
  })
  it('test bind this', async function() {
    const obj = { i: 3 }
    const add = async function() {
      // @ts-ignore
      return --this.i
    }
    const fn = once(add).bind(obj)
    await Promise.all(repeatedCall(3, fn))
    expect(obj.i).toBe(2)
  })
})
