import { watchObject } from './watchObject'

/**
 * @test {watchObject}
 */
describe('test watchObject', () => {
  it('simple example', () => {
    const user = {
      name: 'rx',
      age: 17
    }
    let temp
    watchObject(user, user => {
      expect(user).not.toEqual(temp)
      temp = user
      console.log(temp)
    })

    user.name = '灵梦'
    user.age = 19
  })
})
