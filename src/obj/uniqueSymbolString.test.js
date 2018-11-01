const rxobj = require('../obj')

test('测试生成唯一标识字符串的功能', () => {
  const i = 1
  const str = '1'
  const symbol = Symbol(1)

  expect(rxobj.uniqueSymbol(i)).not.toBe(rxobj.uniqueSymbol(str))
  expect(rxobj.uniqueSymbol(str)).not.toBe(
    rxobj.uniqueSymbol(symbol)
  )
  expect(rxobj.uniqueSymbol(i)).not.toBe(rxobj.uniqueSymbol(symbol))
  expect(rxobj.uniqueSymbol(i)).toBe(rxobj.uniqueSymbol(i))
  expect(rxobj.uniqueSymbol(str)).toBe(rxobj.uniqueSymbol(str))
  // 可以看到 symbol 类型即便是同一个也会生成不同的字符串
  expect(rxobj.uniqueSymbol(symbol)).not.toBe(
    rxobj.uniqueSymbol(symbol)
  )
})
