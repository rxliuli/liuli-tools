import { CombinedPredicate } from './CombinedPredicate'
import { stringValidator } from '../string/stringValidator'
import { async } from './async'

describe('test CombinedPredicate', () => {
  const { and, or, not } = CombinedPredicate
  const { isEmpty, isInteger } = stringValidator
  it('test not', () => {
    const fn = not(isEmpty)
    expect(fn('1')).toBeTrue()
    expect(fn('')).toBeFalse()
  })
  it('test and', () => {
    const fn = and(not(isEmpty), isInteger)
    expect(fn('1')).toBeTrue()
    expect(fn('')).toBeFalse()
    expect(fn('abc')).toBeFalse()
  })
  it('test or', () => {
    const fn = or(isEmpty, isInteger)
    expect(fn('1')).toBeTrue()
    expect(fn('')).toBeTrue()
    expect(fn('abc')).toBeFalse()
  })
  it('test async not', async () => {
    const fn = not(async(isEmpty))
    expect(await fn('a')).toBeTrue()
    expect(await fn('')).toBeFalse()
  })
  it('test async and', async () => {
    const fn = and(not(async(isEmpty)), async(isInteger))
    expect(await fn('1')).toBeTrue()
    expect(await fn('')).toBeFalse()
    expect(await fn('abc')).toBeFalse()
  })
  it('test async or', async () => {
    const fn = or(async(isEmpty), async(isInteger))
    expect(await fn('1')).toBeTrue()
    expect(await fn('')).toBeTrue()
    expect(await fn('abc')).toBeFalse()
  })
})
