import { expect, it, describe } from 'vitest'
import { segmentation } from '../segmentation'

describe('测试 segmentation', () => {
  const arr = [1, 2, 3, 4, 5]

  it('基本示例', () => {
    expect(segmentation(arr, 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(segmentation(arr, 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ])
  })

  it('测试数组为空', () => {
    expect(segmentation([], 1)).toEqual([])
  })

  it('测试按照 1 进行分割', () => {
    expect(segmentation(arr, 1).flat()).toEqual(arr)
  })
})
