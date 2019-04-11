import { returnReasonableItself } from './returnReasonableItself'

/**
 * @test {returnReasonableItself}
 */
describe('test returnReasonableItself', () => {
  it('test singleton paramater', () => {
    const user = {
      name: 'rx',
      age: 17
    }
    expect(returnReasonableItself(user)).toEqual(user)
  })
  it('test no paramater', () =>
    expect(returnReasonableItself()).toBeUndefined())
  const arr = [1, 2]
  it('test multiple paramater', () =>
    expect(returnReasonableItself(...arr)).toIncludeSameMembers(arr))
  it('test array paramater', () =>
    expect(returnReasonableItself(arr)).toIncludeSameMembers(arr))
})
