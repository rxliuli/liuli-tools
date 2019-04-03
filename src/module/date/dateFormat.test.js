import { dateFormat } from './dateFormat'
/**
 * @test {dateFormat} 测试 dateFormat 格式化日期时间
 */
describe('test dateFormat', () => {
  const date = new Date('2019-12-11T11:11:10.100')
  it('test dateFormat for Date', () => {
    expect(dateFormat(date, 'yyyy-MM-dd')).toBe('2019-12-11')
  })
  it('test dateFormat for Time', () => {
    expect(dateFormat(date, 'hh:mm:ss')).toBe('11:11:10')
  })
  it('test dateFormat for ISO', () => {
    expect(dateFormat(date, 'yyyy-MM-ddThh:mm:ss.SSSZ')).toBe(
      '2019-12-11T11:11:10.100Z'
    )
  })
})
