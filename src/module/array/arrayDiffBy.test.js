import { arrayDiffBy } from './arrayDiffBy'
import { toString } from './../function/toString'

/**
 * @test {arrayDiffBy}
 */
describe('test arrayDiffBy', () => {
  it('simple example', () => {
    const thanArr = [1, 2, 3, 4]
    const thatArr = [2, 3, 5]
    const { left, right, common } = arrayDiffBy(thanArr, thatArr)
    expect(left).toIncludeSameMembers([1, 4])
    expect(right).toIncludeSameMembers([5])
    expect(common).toIncludeSameMembers([2, 3])
  })

  it('custom kFn', () => {
    const thanArr = [Symbol(1), Symbol(2), Symbol(3), Symbol(4)]
    const thatArr = [Symbol(2), Symbol(3), Symbol(5)]
    const { left, right, common } = arrayDiffBy(thanArr, thatArr, toString)
    expect(left.map(toString)).toIncludeSameMembers(['Symbol(1)', 'Symbol(4)'])
    expect(right.map(toString)).toIncludeSameMembers(['Symbol(5)'])
    expect(common.map(toString)).toIncludeSameMembers([
      'Symbol(2)',
      'Symbol(3)'
    ])
  })
})
