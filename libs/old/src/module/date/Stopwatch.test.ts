import { Stopwatch } from './Stopwatch'

describe('测试 Stopwatch', () => {
  it('基本示例', () => {
    const time = 2 * 60 * 60 + 2 * 60 + 20
    const str = Stopwatch.format(time)
    expect(str).toBe('02:02:20')
    expect(Stopwatch.parse(str)).toBe(time)
  })
})
