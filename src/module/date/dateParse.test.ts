import { dateParse } from './dateParse'
import { dateFormat } from './dateFormat'

/**
 * @test {dateParse}
 */
describe('测试 dateParse', () => {
  it('简单示例', () => {
    const date = dateParse('2019-12-11', 'yyyy-MM-dd')
    expect(dateFormat(date!, 'yyyy/MM/dd')).toBe('2019/12/11')
    expect(dateFormat(date!, 'hh/mm/ss')).toBe('00/00/00')
    const date2 = dateParse(
      '2019年12月11日 11时11分10秒',
      'yyyy年MM月dd日 hh时mm分ss秒',
    )
    expect(dateFormat(date2!, 'yyyy-MM-dd hh:mm:ss')).toBe(
      '2019-12-11 11:11:10',
    )
  })

  it('测试错误的解析字符串', () => {
    expect(dateParse('2019-12-11', 'yyyy-MM')).toBeNull()
  })
  it('测试简写的年份', () => {
    expect(dateParse('19-12-11', 'yy-MM-dd')!.getFullYear()).toEqual(2019)
  })
  it('测试错误日期', () => {
    expect(dateParse('2019-13-11', 'yyyy-MM-dd')).toBeNull()
    expect(dateParse('2019-11-31', 'yyyy-MM-dd')).toBeNull()
    expect(dateParse('2019-11-31 25:11:11', 'yyyy-MM-dd hh:mm:ss')).toBeNull()
  })
  describe('实际问题', () => {
    it('莫名返回 null', () => {
      console.log(dateParse('2019-09-30 14:45:10', 'yyyy-MM-dd hh:mm:ss'))
    })
  })
})
