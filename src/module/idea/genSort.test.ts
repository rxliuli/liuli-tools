import { genSort } from './genSort'

describe('测试 genSort', () => {
  it('基本示例', () => {
    const arr = [3, 1, 2]
    expect(
      arr
        .map((i) => ({ id: i }))
        .sort(genSort('id'))
        .map(({ id }) => id),
    ).toIncludeSameMembers([3, 2, 1])
    expect(
      arr
        .map((i) => ({ id: i }))
        .sort(genSort('id', 'asc'))
        .map(({ id }) => id),
    ).toIncludeSameMembers([1, 2, 3])
  })
})
