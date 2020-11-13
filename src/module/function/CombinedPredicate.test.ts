import { CombinedPredicate } from './CombinedPredicate'
import { stringValidator } from '../string/StringValidator'
import { async } from '../async/async'

describe('test CombinedPredicate', () => {
  const { and, or, not } = CombinedPredicate
  const { isEmpty, isInteger } = stringValidator
  it('test not', () => {
    const fn = not(isEmpty)
    expect(fn('1')).toBeTruthy()
    expect(fn('')).toBeFalsy()
  })
  it('test and', () => {
    const fn = and(not(isEmpty), isInteger)
    expect(fn('1')).toBeTruthy()
    expect(fn('')).toBeFalsy()
    expect(fn('abc')).toBeFalsy()
  })
  it('test or', () => {
    const fn = or(isEmpty, isInteger)
    expect(fn('1')).toBeTruthy()
    expect(fn('')).toBeTruthy()
    expect(fn('abc')).toBeFalsy()
  })
  it('test async not', async () => {
    const fn = not(async(isEmpty))
    expect(await fn('a')).toBeTruthy()
    expect(await fn('')).toBeFalsy()
  })
  it('test async and', async () => {
    const fn = and(not(async(isEmpty)), async(isInteger))
    expect(await fn('1')).toBeTruthy()
    expect(await fn('')).toBeFalsy()
    expect(await fn('abc')).toBeFalsy()
  })
  it('test async or', async () => {
    const fn = or(async(isEmpty), async(isInteger))
    expect(await fn('1')).toBeTruthy()
    expect(await fn('')).toBeTruthy()
    expect(await fn('abc')).toBeFalsy()
  })
})
