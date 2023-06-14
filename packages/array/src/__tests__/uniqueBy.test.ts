import { expect, it, describe } from 'vitest'
import { uniqueBy } from '../uniqueBy'

/**
 * @test {uniqueBy}
 */
describe('test uniqueBy', () => {
  it('simple example', () => {
    expect(uniqueBy([1, 2, 3, 4, 3, 2, 1])).toEqual(expect.arrayContaining([1, 2, 3, 4]))
  })

  it('test custom kFn', () => {
    class User {
      public id: any
      public name: any
      public age: any

      constructor(id: number, name: string, age: number) {
        this.id = id
        this.name = name
        this.age = age
      }
    }

    const users = [
      new User(1, 'rx', 18),
      new User(2, '琉璃', 17),
      new User(3, '灵梦', 15),
      new User(4, 'rx', 18),
      new User(5, '琉璃', 17),
    ]

    expect(uniqueBy(users, ({ name }) => name)).toEqual([
      new User(1, 'rx', 18),
      new User(2, '琉璃', 17),
      new User(3, '灵梦', 15),
    ])
  })
})
