import { sortBy } from './sortBy'
import { CombinedPredicate } from '../function/CombinedPredicate'

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
      public name: any
      public age: any
      constructor(name: string, age: number) {
        this.name = name
        this.age = age
      }
    }
    const arr = [
      new User('琉璃', 18),
      new User('chu_xuan', 23),
      new User('rx', 17),
    ]
    const kFn = (user: User) => user.age
    const { not } = CombinedPredicate
    expect(sortBy(arr, kFn)).toIncludeSameMembers([
      new User('rx', 17),
      new User('琉璃', 18),
      new User('chu_xuan', 23),
    ])
    expect(sortBy(arr, not(kFn))).toIncludeSameMembers([
      new User('chu_xuan', 23),
      new User('琉璃', 18),
      new User('rx', 17),
    ])
  })
})
