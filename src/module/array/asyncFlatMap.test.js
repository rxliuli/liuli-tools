import { range } from './range'
import { asyncFlatMap } from './asyncFlatMap'

/**
 * @test {asyncFlatMap}
 */
describe('test asyncFlatMap', () => {
  it('test simple example', async () => {
    const res = await asyncFlatMap(range(1, 4), async i => range(1, i + 1))
    expect(res).toEqual(expect.arrayContaining([1, 1, 2, 1, 2, 3]))
  })
})
