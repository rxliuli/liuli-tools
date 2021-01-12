import { formatTimestamp } from './formatTimestamp'

describe('测试 formatTimestamp', () => {
  it('基本示例', () => {
    expect(formatTimestamp(0)).toBe('00:00:00')
    expect(formatTimestamp(10)).toBe('00:00:10')
    expect(formatTimestamp(60)).toBe('00:01:00')
    expect(formatTimestamp(65)).toBe('00:01:05')
    expect(formatTimestamp(3665)).toBe('01:01:05')
  })
})
