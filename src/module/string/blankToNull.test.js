import { blankToNull } from './blankToNull'

test('test blankToNull', () => {
  expect(blankToNull('')).toBe(null)
  expect(blankToNull('a')).toBe('a')
})
