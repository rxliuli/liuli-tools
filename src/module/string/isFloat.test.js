import { isFloat } from './isFloat'

test('test isFloat', () => {
  expect(isFloat('5')).toBe(true)
  expect(isFloat('5.6')).toBe(true)
  expect(isFloat('5.a')).toBe(false)
})
