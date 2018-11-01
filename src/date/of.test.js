const rxdate = require('../date')

test('测试解析时间', () => {
  const date = new Date()
  const fmt = 'ss秒钟mm分钟hh小时SSS毫秒 MM月 dd号 yyyy年'
  const res = rxdate.format(date, fmt)
  console.log(res)

  var dateRes = rxdate.of(res, fmt)

  expect(rxdate.equals(dateRes, date)).toBe(true)
})
