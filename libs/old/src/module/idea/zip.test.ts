import { zip } from './zip'

describe('测试 zip', () => {
  it('基本示例', () => {
    expect(zip([2, 4, 3], [5, 6, 4], (i, k) => i + k)).toEqual([7, 10, 7])
  })
  it('不传 operation 函数', () => {
    expect(zip([2, 4, 3], [5, 6, 4])).toEqual([
      [2, 5],
      [4, 6],
      [3, 4],
    ])
  })
})
