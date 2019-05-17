import { flatMap } from './flatMap'
import { range } from './range'

/**
 * @test {flatMap}
 */
describe('test flatMap', () => {
  it('test simple example', () =>
    expect(flatMap(range(1, 4), i => range(1, i + 1))).toEqual(
      expect.arrayContaining([1, 1, 2, 1, 2, 3])
    ))
})
