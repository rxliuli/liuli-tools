import unique from './unique'

test('测试数组元素去重的方法', () => {
  const arr = [1, 2, 3, 4, 5, 1]

  // 测试去重普通同一类型的数组
  expect(unique(arr)).toHaveLength(5)
  // 测试去重不同类型的数组
  expect(unique([1, '1', Symbol(1), Symbol('1')])).toHaveLength(4)

  // 这里如果是同一个引用的 Symbol 类型的对象会被过滤掉，否则保留
  const symbol = Symbol(1)
  expect(unique([symbol, Symbol(1), symbol])).toHaveLength(2)
})
