import { ArrayUtil } from './ArrayUtil'

describe('测试 ArrayUtil', () => {
  it('测试 swap', () => {
    const arr = [1, 2, 3]
    ArrayUtil.swap(arr, 0, 2)
    expect(arr).toIncludeAllMembers([3, 2, 1])
  })
})
