const format = require('./format')

test('测试字符串格式化（ES6 之前）', () => {
  const tempStr = `
<a href="{url}">{displayVal}</a>
`
  const formatParams = {
    url: 'https://www.google.com',
    displayVal: 'Google Search'
  }
  const res = format(tempStr, formatParams)

  // 包含替换后两个值
  expect(res).toContain(formatParams.url)
  expect(res).toContain(formatParams.displayVal)
})
