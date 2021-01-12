import { stream } from './stream'

describe('测试 stream', () => {
  it('基本示例', () => {
    const arr = stream([1, 2, 3, 4, 5, 6, 7, 8])
      .filter((i) => i % 2 === 0)
      .map((i) => i.toString())
      .value()
    expect(arr).toEqual(['2', '4', '6', '8'])
  })
})
