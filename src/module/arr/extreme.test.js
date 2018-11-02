import extreme from './extreme'

test('测试获取数组中的元素最大值', () => {
  const arr = [1, 2, 3, 4, 5, 6]

  // 保持与 sort 方法的 compare 一直，相比于 sort() 会有少许性能上的优势
  // 活取最小值
  expect(extreme(arr, (i, k) => i - k)).toBe(arr.sort((i, k) => i - k)[0])
  // 获取最大值
  expect(extreme(arr, (i, k) => k - i)).toBe(arr.sort((i, k) => k - i)[0])
})
