const of = require('./of')
const rxdate = require('../date')

test('测试解析时间', () => {
  const date = new Date()
  const fmt = 'ss秒钟mm分钟hh小时SSS毫秒 MM月 dd号 yyyy年'
  const res = rxdate.format(date, fmt)
  console.log(res)

  var dateRes = of(res, fmt)

  expect(dateRes.toISOString()).toBe(date.toISOString())
})
