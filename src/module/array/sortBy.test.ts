import { sortBy } from './sortBy'
import { CombinedPredicate } from '../function/CombinedPredicate'

/**
 * @test {sortBy}
 */
describe('测试 sortBy', () => {
  it('基本示例', () => {
    const arr = [5, 1, 2, 4, 3]
    expect(sortBy(arr)).toIncludeSameMembers([1, 2, 3, 4, 5])
    expect(sortBy(arr, (i) => -i)).toIncludeSameMembers([5, 4, 3, 2, 1])
  })
  it('测试对象数组', () => {
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
  it.skip('测试根据外部的值进行获取', () => {
    const map = {
      1: 2,
      2: 1,
      3: 1,
    }
    const arr: (keyof typeof map)[] = [1, 2, 3]
    expect(sortBy(arr, (k) => map[k])).toEqual([2, 3, 1])
  })
})
