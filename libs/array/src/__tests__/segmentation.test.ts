import { segmentation } from '../segmentation'

describe('test segmentation', () => {
  it('simple example', () => {
    expect(segmentation([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(segmentation([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ])
  })
  it('exception', () => {
    expect(() => segmentation([1, 2, 3, 4, 5], 1)).toThrow()
  })
})
