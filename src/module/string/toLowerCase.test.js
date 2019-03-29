import { toLowerCase } from './toLowerCase'

test('test toLowerCase', () => {
  expect(toLowerCase('STR')).toBe('str')
  expect(toLowerCase('Str')).toBe('str')
  expect(toLowerCase()).toBe(undefined)
})
