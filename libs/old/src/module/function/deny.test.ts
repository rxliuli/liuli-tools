import { deny } from './deny'

/**
 * @test {deny}
 */
describe('test deny', () => {
  const isEmpty = (s: string | null | undefined) =>
    s === null || s === undefined || s.length === 0
  it('simple example', () => {
    const fn = deny(isEmpty)
    expect(fn(undefined)).toBeFalse()
    expect(fn(null)).toBeFalse()
    expect(fn('')).toBeFalse()
    expect(fn(' ')).toBeTrue()
    expect(fn('a')).toBeTrue()
  })
  it('test async function', async () => {
    const asyncIsEmpty = async (str: string | null | undefined) => isEmpty(str)
    const fn = deny(asyncIsEmpty)
    expect(await fn(undefined)).toBeFalse()
    expect(await fn(null)).toBeFalse()
    expect(await fn('')).toBeFalse()
    expect(await fn(' ')).toBeTrue()
    expect(await fn('a')).toBeTrue()
  })
})
