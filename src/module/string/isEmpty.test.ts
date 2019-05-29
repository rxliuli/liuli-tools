import { isEmpty } from './isEmpty'

/**
 * @test {isEmpty}
 */
describe('test isEmpty', () => {
  it('simple example', () => {
    expect(isEmpty(null)).toBeTrue()
    expect(isEmpty(undefined)).toBeTrue()
    expect(isEmpty('')).toBeTrue()
    expect(isEmpty(' ')).toBeFalse()
    expect(isEmpty('a')).toBeFalse()
  })
})
