import { ArrayValidator } from './ArrayValidator'

/**
 * @test {ArrayValidator}
 */
describe('test ArrayValidator', () => {
  const { isEmpty } = ArrayValidator
  it('test isEmpty', () => {
    expect(isEmpty(undefined)).toBeTrue()
    expect(isEmpty(null)).toBeTrue()
    expect(isEmpty([])).toBeTrue()
    expect(isEmpty(['a'])).toBeFalse()
  })
})
