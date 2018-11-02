import rxobj from '../obj'

test('测试生成唯一标识字符串的功能', () => {
  const i = 1
  const str = '1'
  const symbol = Symbol(1)

  expect(rxobj.uniqueSymbolString(i)).not.toBe(rxobj.uniqueSymbolString(str))
  expect(rxobj.uniqueSymbolString(str)).not.toBe(
    rxobj.uniqueSymbolString(symbol)
  )
  expect(rxobj.uniqueSymbolString(i)).not.toBe(rxobj.uniqueSymbolString(symbol))
  expect(rxobj.uniqueSymbolString(i)).toBe(rxobj.uniqueSymbolString(i))
  expect(rxobj.uniqueSymbolString(str)).toBe(rxobj.uniqueSymbolString(str))
  // 可以看到 symbol 类型即便是同一个也会生成不同的字符串
  expect(rxobj.uniqueSymbolString(symbol)).not.toBe(
    rxobj.uniqueSymbolString(symbol)
  )
})
