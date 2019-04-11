import { uniqueBy } from './uniqueBy'

/**
 * @test {uniqueBy}
 */
describe('test uniqueBy', () => {
  it('simple example', () =>
    expect(uniqueBy([1, 2, 3, 4, 3, 2, 1])).toEqual(
      expect.arrayContaining([1, 2, 3, 4])
    ))
})
