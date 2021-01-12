import { asIterator } from './asIterator'

/**
 * @test {asIterator}
 */
describe.skip('test asIterator', () => {
  it('test Set', () => {
    const arr = [1, 2, 3]
    const set = new Set(arr)
    const iterator = set.values()
    expect(asIterator(iterator)).toIncludeAllMembers(arr)
    expect(asIterator(iterator)).toIncludeAllMembers(Array.from(iterator))
  })
})
