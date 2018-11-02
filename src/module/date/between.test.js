import between from './between'

test('获取两个日期之间的差值', () => {
  const oldDate = new Date('2001-01-01 00:00:00:00:000')
  const nowDate = new Date()
  const newDate = new Date('2020-12-31 59:59:59:000')

  // 测试年份
  expect(between(oldDate, nowDate).yaer()).toBe(
    nowDate.getFullYear() - oldDate.getFullYear()
  )
})
