import { returnItself } from './returnItself'

/**
 * @test {returnItself}
 */
describe('test returnItself', () => {
  it('simple example', () => {
    const user = {
      name: 'rx',
      age: 17
    }
    expect(returnItself(user)).toEqual(user)
  })
})
