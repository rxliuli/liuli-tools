import { groupBy } from '../groupBy'

describe('测试 groupBy', () => {
  it('基本示例', () => {
    const arr = [1, 2, 3]
    expect(groupBy(arr, (i) => i % 2 === 0)).toEqual(
      new Map().set(true, [2]).set(false, [1, 3]),
    )
  })
})
