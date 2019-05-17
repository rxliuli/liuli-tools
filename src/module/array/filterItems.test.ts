import { filterItems } from './filterItems'
/**
 * @test {filterItems}
 */
describe('test filterItems', () => {
  it('simple example', () => {
    const arr = [1, 2, 3, 4]
    const deleteArr = [1, 2]
    expect(filterItems(arr, deleteArr)).toIncludeSameMembers([3, 4])
    expect(arr).toIncludeSameMembers(arr)
  })

  it('custom kFn', () => {
    const arr = [Symbol(1), Symbol(2), Symbol(3), Symbol(4)]
    const deleteArr = [Symbol(1), Symbol(2)]
    expect(filterItems(arr, deleteArr)).toIncludeSameMembers(arr)
    expect(
      filterItems(arr, deleteArr, symbol => symbol.toString()).map(symbol =>
        symbol.toString()
      )
    ).toIncludeSameMembers(['Symbol(3)', 'Symbol(4)'])
    expect(arr).toIncludeSameMembers(arr)
  })
})
