import { arrayToMap } from './arrayToMap'

/**
 * @test {arrayToMap}
 */
describe('test arrayToMap', () => {
  it('arrayToMap [1, 2, 3] to equals Map({1 => 1, 2 => 2, 3 => 3})', () => {
    const arr = [1, 2, 3]
    expect(arrayToMap(arr, i => i)).toEqual(
      new Map()
        .set(1, 1)
        .set(2, 2)
        .set(3, 3)
    )
  })
})
