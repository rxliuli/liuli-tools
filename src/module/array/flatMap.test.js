import { flatMap } from './flatMap'
import { range } from './range'
test('test flatMap', () => {
  expect(flatMap(range(1, 4), i => range(1, i + 1))).toEqual(
    expect.arrayContaining([1, 1, 2, 1, 2, 3])
  )
})
