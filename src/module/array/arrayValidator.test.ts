import { arrayValidator } from '../../index'

/**
 * @test {arrayValidator}
 */
describe('test arrayValidator', () => {
  const { isEmpty } = arrayValidator
  it('test isEmpty', () => {
    expect(isEmpty(undefined)).toBeTrue()
    expect(isEmpty(null)).toBeTrue()
    expect(isEmpty([])).toBeTrue()
    expect(isEmpty(['a'])).toBeFalse()
  })
})