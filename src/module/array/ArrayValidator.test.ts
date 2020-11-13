import { ArrayValidator } from './ArrayValidator'

/**
 * @test {ArrayValidator}
 */
describe('test ArrayValidator', () => {
  const { isEmpty } = ArrayValidator
  it('test isEmpty', () => {
    expect(isEmpty(undefined)).toBeTruthy()
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty(['a'])).toBeFalsy()
  })
})
