import { differenceBy, uniqBy } from 'lodash'

describe('测试 diffBy', () => {
  it('基本示例', () => {
    const res = differenceBy([1, 3], [3, 4])
    expect(res).toEqual([1])
  })
  it('对象类型', () => {
    const res = differenceBy(
      [
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      [
        [2, 2],
        [3, 1],
        [4, 1],
      ],
      (item) => item.join(','),
    )
    expect(res.map((item) => item[0])).toEqual([1, 2])
  })
})

describe('测试 uniqBy', () => {
  it('测试过滤得到结果的顺序', () => {
    const res = uniqBy(
      [
        [1, 1],
        [2, 1],
      ],
      (item) => item[1],
    )
    expect(res).toEqual([[1, 1]])
  })
})
