import equals from './equals'

test('测试比较两个日期是否相等', () => {
  const date1 = new Date('2017-12-11')
  const date2 = new Date('2017-12-11')

  expect(equals(date1, date2)).toBe(true)
  expect(equals(date1, new Date())).toBe(false)
  expect(equals(null, null)).toBe(true)
  expect(equals(null, date2)).toBe(false)
})
