import { stringValidator } from './stringValidator'

/**
 * @test {stringValidator}
 */
describe('test stringValidator', () => {
  const { isBlank, isEmpty, isFloat, isInteger } = stringValidator
  it('test isBlank', () => {
    expect(isBlank(null)).toBeTrue()
    expect(isBlank(undefined)).toBeTrue()
    expect(isBlank('')).toBeTrue()
    expect(isBlank(' ')).toBeTrue()
    expect(isBlank('a')).toBeFalse()
  })
  it('test isEmpty', () => {
    expect(isEmpty(null)).toBeTrue()
    expect(isEmpty(undefined)).toBeTrue()
    expect(isEmpty('')).toBeTrue()
    expect(isEmpty(' ')).toBeFalse()
    expect(isEmpty('a')).toBeFalse()
  })
  it('test isFloat', () => {
    expect(isFloat('5')).toBe(true)
    expect(isFloat('5.6')).toBe(true)
    expect(isFloat('5.a')).toBe(false)
  })
  it('test isInteger', () => {
    expect(isInteger('7')).toBe(true)
    expect(isInteger('7.5')).toBe(false)
    expect(isInteger('7.a')).toBe(false)
  })
})
