const toObject = require('./toObject')

test('测试将数组转换成对象', () => {
  const arr = [1, 2, 3, 4]
  const res = toObject(arr, i => [i, `这是 ${i} 个元素`])

  console.log(res)

  arr.forEach(i => {
    expect(res).toHaveProperty(`${i}`)
  })
})
