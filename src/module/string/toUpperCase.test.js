import { toUpperCase } from './toUpperCase'

test('test toUpperCase', () => {
  expect(toUpperCase('str')).toBe('STR')
  expect(toUpperCase('Str')).toBe('STR')
  expect().toBe(undefined)
})
