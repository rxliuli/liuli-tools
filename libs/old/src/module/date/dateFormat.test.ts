import { dateFormat } from './dateFormat'

/**
 * @test {dateFormat} 测试 dateFormat 格式化日期时间
 */
describe('测试 dateFormat', () => {
  const date = new Date('2019-12-11T11:11:10.100')
  it('基本示例', () => {
    expect(dateFormat(date, 'yyyy-MM-dd')).toBe('2019-12-11')
    expect(dateFormat(date, 'hh:mm:ss')).toBe('11:11:10')
    expect(dateFormat(date, 'yyyy-MM-ddThh:mm:ss.SSSZ')).toBe(
      '2019-12-11T11:11:10.100Z',
    )
  })
  it('使用大写日期模式', () => {
    const now = new Date()
    expect(dateFormat(now, 'YYYY-MM-DD')).toBe(dateFormat(now, 'yyyy-MM-dd'))
    expect(dateFormat(now, 'hh:mm:ss')).toBe(dateFormat(now, 'HH:mm:ss'))
  })
})
