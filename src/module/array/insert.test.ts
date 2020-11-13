import { insert } from './insert'

describe('测试 insert', function () {
  it('简单示例', () => {
    const arr = [1, 2]
    //测试插入一条数据
    insert(arr, 0, 3)
    expect(arr).toEqual([3, 1, 2])
    //插入多条
    insert(arr, 0, 4, 5)
    expect(arr).toEqual([4, 5, 3, 1, 2])
    //测试返回的位置
    expect(insert(arr, 1, 1)).toBe(1)
    let len = arr.length
    expect(insert(arr, -1, 1)).toBe(len - 1)
    len = arr.length
    expect(insert(arr, 100, 1)).toBe(len)
  })
})
