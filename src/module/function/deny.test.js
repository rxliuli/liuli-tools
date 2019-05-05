import { deny } from './deny'
import { isEmpty } from '../string/isEmpty'

/**
 * @test {deny}
 */
describe('test deny', () => {
  it('simple example', () => {
    const fn = deny(isEmpty)
    expect(fn()).toBeFalse()
    expect(fn(undefined)).toBeFalse()
    expect(fn(null)).toBeFalse()
    expect(fn('')).toBeFalse()
    expect(fn(' ')).toBeTrue()
    expect(fn('a')).toBeTrue()
  })
  it('test async function', async () => {
    const asyncIsEmpty = async str => isEmpty(str)
    const fn = deny(asyncIsEmpty)
    expect(await fn()).toBeFalse()
    expect(await fn(undefined)).toBeFalse()
    expect(await fn(null)).toBeFalse()
    expect(await fn('')).toBeFalse()
    expect(await fn(' ')).toBeTrue()
    expect(await fn('a')).toBeTrue()
  })
})
