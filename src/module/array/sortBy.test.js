import { sortBy } from './sortBy'

/**
 * @test {sortBy}
 */
describe('test sortBy', () => {
  it('simple example', () => {
    const arr = [5, 1, 2, 4, 3]
    expect(sortBy(arr)).toIncludeSameMembers([1, 2, 3, 4, 5])
    expect(sortBy(arr, i => -i)).toIncludeSameMembers([5, 4, 3, 2, 1])
  })
  it('test object item array', () => {
    class User {
      constructor (name, age) {
        this.name = name
        this.age = age
      }
    }
    const arr = [
      new User('琉璃', 18),
      new User('chu_xuan', 23),
      new User('rx', 17),
    ]
    expect(sortBy(arr, user => user.age)).toIncludeSameMembers([
      new User('rx', 17),
      new User('琉璃', 18),
      new User('chu_xuan', 23),
    ])
    expect(sortBy(arr, user => -user.age)).toIncludeSameMembers([
      new User('chu_xuan', 23),
      new User('琉璃', 18),
      new User('rx', 17),
    ])
  })
})
