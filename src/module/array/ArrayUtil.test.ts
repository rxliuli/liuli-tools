import { ArrayUtil } from './ArrayUtil'

describe('测试 ArrayUtil', () => {
  it('测试 swap', () => {
    const arr = [1, 2, 3]
    const res = ArrayUtil.swap(arr, 0, 2)
    expect(res).toIncludeAllMembers([3, 2, 1])
  })
  describe('测试 equalsByDisorder', () => {
    it('基本示例', () => {
      const res = ArrayUtil.equalsByDisorder([1, 2, 3], [2, 3, 1])
      expect(res).toBe(true)
    })
    it('测试不同的', () => {
      const res = ArrayUtil.equalsByDisorder([1, 2, 3], [3, 2])
      expect(res).toBe(false)
    })
  })
})
