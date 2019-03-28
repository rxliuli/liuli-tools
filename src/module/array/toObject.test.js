import { toObject } from './toObject'

test('test toObject', () => {
  expect(toObject([1, 2, 3], i => i)).toEqual({ 1: 1, 2: 2, 3: 3 })
})
