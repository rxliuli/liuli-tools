import { CombinedPredicate } from './CombinedPredicate'
import { stringValidator } from '../string/StringValidator'
import { async } from '../async/async'

describe('test CombinedPredicate', () => {
  const { and, or, not } = CombinedPredicate
  it('test not', () => {
    const fn = not(stringValidator.isEmpty)
    expect(fn('1')).toBeTrue()
    expect(fn('')).toBeFalse()
  })
  it('test and', () => {
    const fn = and(not(stringValidator.isEmpty), stringValidator.isInteger)
    expect(fn('1')).toBeTrue()
    expect(fn('')).toBeFalse()
    expect(fn('abc')).toBeFalse()
  })
  it('test or', () => {
    const fn = or(stringValidator.isEmpty, stringValidator.isInteger)
    expect(fn('1')).toBeTrue()
    expect(fn('')).toBeTrue()
    expect(fn('abc')).toBeFalse()
  })
  it('test async not', async () => {
    const fn = not(async(stringValidator.isEmpty))
    expect(await fn('a')).toBeTrue()
    expect(await fn('')).toBeFalse()
  })
  it('test async and', async () => {
    const fn = and(
      not(async(stringValidator.isEmpty)),
      async(stringValidator.isInteger),
    )
    expect(await fn('1')).toBeTrue()
    expect(await fn('')).toBeFalse()
    expect(await fn('abc')).toBeFalse()
  })
  it('test async or', async () => {
    const fn = or(
      async(stringValidator.isEmpty),
      async(stringValidator.isInteger),
    )
    expect(await fn('1')).toBeTrue()
    expect(await fn('')).toBeTrue()
    expect(await fn('abc')).toBeFalse()
  })
})
