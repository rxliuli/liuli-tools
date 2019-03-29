import { strToDate } from './strToDate'
import { dateFormat } from './dateFormat'
test('test strToDate', () => {
  const date = strToDate('2019-12-11', 'yyyy-MM-dd')
  expect(dateFormat(date, 'yyyy/MM/dd')).toBe('2019/12/11')
  expect(dateFormat(date, 'hh/mm/ss')).toBe('00/00/00')
  const date2 = strToDate(
    '2019年12月11日 11时11分10秒',
    'yyyy年MM月dd日 hh时mm分ss秒'
  )
  expect(dateFormat(date2, 'yyyy-MM-dd hh:mm:ss')).toBe('2019-12-11 11:11:10')
})
