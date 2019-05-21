import { groupBy } from './groupBy'
import { range } from './range'

/**
 * @test {groupBy}
 */
describe('test groupBy', () => {
  it('groupBy [1, 2, 3] to equals Map({true => [1, 2], false => 2})', () => {
    const arr = [1, 2, 3]
    expect(groupBy(arr, i => i % 2 === 0)).toEqual(
      new Map().set(true, [2]).set(false, [1, 3]),
    )
  })
  it('use groupBy', () => {
    const arr = [1, 2, 3]
    expect(
      // 注意: 由于 ts 类型推断的限制，此处的 res: string[] 是必不可少的！
      groupBy(arr, i => i % 2 === 0, (res: string[], i) => [...res, i + '']),
    ).toEqual(new Map().set(true, ['2']).set(false, ['1', '3']))
  })
  it('groupBy for eval sum', () => {
    const arr = [1, 2, 3, 4]
    // 分组完成之后立即计算总和
    expect(
      groupBy(
        arr,
        i => i % 2 === 0,
        (res: number, i: number) => res + i,
        () => 0,
      ),
    ).toEqual(new Map().set(true, 6).set(false, 4))
  })
  it('groupBy for custom vFn', () => {
    class User {
      public id: any
      public name: any
      public sex: any
      constructor(id: number, name: string, sex: number) {
        this.id = id
        this.name = name
        this.sex = sex
      }
    }
    const users = [
      new User(1, 'rx', 1),
      new User(2, '琉璃', 1),
      new User(3, '楚轩', 2),
    ]
    // 分组完成将结果集转为 Map
    expect(
      groupBy(
        users,
        ({ sex }) => sex % 2 === 0,
        (res: { set: (arg0: any, arg1: any) => void }, { id, name }: any) => {
          res.set(id, name)
          return res
        },
        () => new Map(),
      ),
    ).toEqual(
      new Map()
        .set(false, new Map().set(1, 'rx').set(2, '琉璃'))
        .set(true, new Map().set(3, '楚轩')),
    )
  })
  it('group by index', () => {
    const arr = range(1, 10, 1)
    expect(
      Array.from(groupBy(arr, (_v, i) => Math.floor(i / 3)).values()),
    ).toIncludeAllMembers([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  })
})
