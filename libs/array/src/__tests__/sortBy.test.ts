import { sortBy } from '../sortBy'
import { Random } from 'mockjs'
import { groupBy } from '../groupBy'

/**
 * @test {sortBy}
 */
describe('测试 sortBy', () => {
  it('基本示例', () => {
    const arr = [5, 1, 2, 4, 3]
    expect(sortBy(arr)).toEqual([1, 2, 3, 4, 5])
    expect(sortBy(arr, (i) => -i)).toEqual([5, 4, 3, 2, 1])
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
    expect(sortBy(arr, kFn)).toEqual([arr[2], arr[0], arr[1]])
    expect(sortBy(arr, (i) => -kFn(i))).toEqual([arr[1], arr[0], arr[2]])
  })
  it('测试排序结果等同于内置的 sort 函数', () => {
    const arr = Array(1000)
      .fill(0)
      .map((v, i) => [Math.random(), i])
    expect(sortBy(arr, ([v]) => v)).toEqual([...arr].sort(([a], [b]) => a - b))
  })
  it('测试排序是稳定的', () => {
    const arr = new Array(100).fill(0).map((_, key) => ({
      key,
      value: Random.integer(1, 10),
    }))
    const res = sortBy(arr, (item) => item.value)
    const map = groupBy(res, (item) => item.value)
    ;[...map.values()].forEach((arr) => {
      expect(arr).toEqual(sortBy(arr, (item) => item.key))
    })
  })
})
