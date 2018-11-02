import fill from './fill'

test('测试字符串填充函数', () => {
  const res = fill('*', 3)

  expect(res).toHaveLength(3)
})
