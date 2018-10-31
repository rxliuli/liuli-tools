const format = require('./format')

test('测试日期格式化 date format', () => {
  const date = new Date()
  expect(format(date, 'yyyy-MM-dd')).toBe(date.toISOString().substr(0, 10))
})
