import { findIndex } from './findIndex'

describe('test findIndex', () => {
  it('simple example', () => {
    const arr = [1, 2, 1, 4, 5]
    const fn = (i: number) => i === 2
    expect(findIndex(arr, fn)).toBe(arr.findIndex(fn))
    expect(findIndex(arr, fn, 2)).toBe(-1)
    expect(findIndex(arr, i => i === 1, 2)).toBe(2)
  })
})
