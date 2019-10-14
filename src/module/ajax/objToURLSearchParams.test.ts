import { objToURLSearchParams } from './objToURLSearchParams'

describe('测试 objToURLSearchParams', () => {
  it('简单示例', () => {
    const obj = { name: 'rx', age: 17 }
    const urlParams = objToURLSearchParams(obj)
    urlParams.forEach((v, k) => {
      expect(v).toBe(Reflect.get(obj, k).toString())
    })
  })
})
