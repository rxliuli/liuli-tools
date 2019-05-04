import { groupBy } from './groupBy'

/**
 * @test {groupBy}
 */
describe('test groupBy', () => {
  it('groupBy [1, 2, 3] to equals Map({true => [1, 2], false => 2})', () => {
    const arr = [1, 2, 3]
    expect(groupBy(arr, i => i % 2 === 0)).toEqual(
      new Map().set(true, [2]).set(false, [1, 3])
    )
  })
  it('groupBy for eval sum', () => {
    const arr = [1, 2, 3, 4]
    // 分组完成之后立即计算总和
    expect(
      groupBy(arr, i => i % 2 === 0, (res, i) => (res += i), () => 0)
    ).toEqual(new Map().set(true, 6).set(false, 4))
  })
  it('groupBy for custom vFn', () => {
    class User {
      constructor (id, name, sex) {
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
        (res, { id, name }) => {
          res.set(id, name)
          return res
        },
        () => new Map()
      )
    ).toEqual(
      new Map()
        .set(false, new Map().set(1, 'rx').set(2, '琉璃'))
        .set(true, new Map().set(3, '楚轩'))
    )
  })
})
