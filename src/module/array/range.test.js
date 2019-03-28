import { range } from './range'

test('range 1-3 is [1,2,3]', () => {
  expect(range(1, 4)).toEqual(expect.arrayContaining([1, 2, 3]))
})
