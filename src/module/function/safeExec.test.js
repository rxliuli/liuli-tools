import { safeExec } from './safeExec'

test('test safeExec normal', () => {
  expect(safeExec(() => 10)).toBe(10)
})
test('test safeExec throw Error', () => {
  expect(
    safeExec(() => {
      throw new Error()
    })
  ).toBeUndefined()
})
test('test safeExec throw Error, and set default value', () => {
  expect(
    safeExec(() => {
      throw new Error()
    }, 10)
  ).toBe(10)
})
