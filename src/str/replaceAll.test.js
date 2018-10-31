const replaceAll = require('./replaceAll')

test('测试替换字符串的某些全部内容', () => {
  const str = 'abcdefgabcdefg'
  expect(replaceAll(str, 'ab|ef', ' ')).toBe(str.replace(/ab|ef/gm, ' '))
})
