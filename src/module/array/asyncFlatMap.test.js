import { range } from './range'
import { asyncFlatMap } from './asyncFlatMap'

/**
 * @test {asyncFlatMap}
 */
describe('test asyncFlatMap', () => {
  it('simple example', async () => {
    expect(
      await asyncFlatMap(range(1, 4), async i => range(1, i + 1))
    ).toIncludeAllMembers([1, 1, 2, 1, 2, 3])
  })
})
