import { arrayToMap } from './arrayToMap'
import { returnItself } from '../function/returnItself'

/**
 * @test {arrayToMap}
 */
describe('test arrayToMap', () => {
  it('arrayToMap [1, 2, 3] to equals Map({1 => 1, 2 => 2, 3 => 3})', () => {
    const arr = [1, 2, 3]
    expect(arrayToMap(arr, (i: any) => i)).toEqual(
      new Map()
        .set(1, 1)
        .set(2, 2)
        .set(3, 3),
    )
  })
  it('use vFn', () => {
    const arr = [1, 2, 3]
    expect(arrayToMap(arr, returnItself, i => i * 2 + '')).toEqual(
      new Map()
        .set(1, '2')
        .set(2, '4')
        .set(3, '6'),
    )
  })
})
