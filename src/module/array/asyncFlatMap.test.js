import { range } from './range'
import { asyncFlatMap } from './asyncFlatMap'

test('test asyncFlatMap', async () => {
  const res = await asyncFlatMap(range(1, 4), async i => range(1, i + 1))
  console.log(res)
  expect(res).toEqual(expect.arrayContaining([1, 1, 2, 1, 2, 3]))
})
