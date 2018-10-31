const rxstr = require('./index')

test('测试字符串工具模块', () => {
  expect(rxstr).toHaveProperty('replaceAll')
  expect(rxstr).toHaveProperty('format')
  expect(rxstr).toHaveProperty('fill')
})
