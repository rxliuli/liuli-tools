import { strToDate } from './strToDate'
import { dateFormat } from './dateFormat'

/**
 * @test {strToDate}
 */
describe('test strToDate', () => {
  it('test normal parse string to date', () => {
    const date = strToDate('2019-12-11', 'yyyy-MM-dd')
    expect(dateFormat(date, 'yyyy/MM/dd')).toBe('2019/12/11')
    expect(dateFormat(date, 'hh/mm/ss')).toBe('00/00/00')
    const date2 = strToDate(
      '2019年12月11日 11时11分10秒',
      'yyyy年MM月dd日 hh时mm分ss秒'
    )
    expect(dateFormat(date2, 'yyyy-MM-dd hh:mm:ss')).toBe(
      '2019-12-11 11:11:10'
    )
  })

  it('test the wrong string format', () => {
    expect(strToDate('2019-12-11', 'yyyy-MM')).toBeNull()
  })
  it('test year for two numbers', () => {
    expect(strToDate('19-12-11', 'yy-MM-dd').getFullYear()).toEqual(2019)
  })
  it('test error date for 13 month', () => {
    const date = strToDate('2019-13-11', 'yyyy-MM-dd')
    expect(date.getFullYear()).toBeNaN()
  })
})
