import { uniqueBy } from './uniqueBy'
test('test uniqueBy', () => {
  expect(uniqueBy([1, 2, 3, 4, 3, 2, 1])).toEqual(
    expect.arrayContaining([1, 2, 3, 4])
  )
})
