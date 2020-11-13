import { diffBy } from './diffBy'
import { toString } from '../string/toString'

/**
 * @test {diffBy}
 */
describe('test diffBy', () => {
  it('simple example', () => {
    const thanArr = [1, 2, 3, 4]
    const thatArr = [2, 3, 5]
    const { left, right, common } = diffBy(thanArr, thatArr)
    expect(left).toEqual([1, 4])
    expect(right).toEqual([5])
    expect(common).toEqual([2, 3])
  })

  it('custom kFn', () => {
    const thanArr = [Symbol(1), Symbol(2), Symbol(3), Symbol(4)]
    const thatArr = [Symbol(2), Symbol(3), Symbol(5)]
    const { left, right, common } = diffBy(thanArr, thatArr, toString)
    expect(left.map(toString)).toEqual(['Symbol(1)', 'Symbol(4)'])
    expect(right.map(toString)).toEqual(['Symbol(5)'])
    expect(common.map(toString)).toEqual(['Symbol(2)', 'Symbol(3)'])
  })
  it('custom diff type', () => {
    interface IUser {
      name: string
      pwd: string
    }
    interface IPerson {
      name: string
      age: number
    }
    const userList: IUser[] = [
      { name: 'rx', pwd: '123' },
      { name: 'liuli', pwd: '123' },
      { name: '灵梦', pwd: '123' },
      { name: '伊凡', pwd: '123' },
    ]
    const personList: IPerson[] = [
      { name: '女娲', age: 1000 },
      { name: 'liuli', age: 17 },
      { name: '灵梦', age: 15 },
    ]
    const { common } = diffBy(userList, personList, 'name')
    expect(common).toEqual([
      { name: 'liuli', pwd: '123' },
      { name: '灵梦', pwd: '123' },
    ])
  })
})
