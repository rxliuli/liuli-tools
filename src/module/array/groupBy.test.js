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
})
