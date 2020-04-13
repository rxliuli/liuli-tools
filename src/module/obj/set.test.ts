import { set } from './set'

describe('测试 set', function() {
  it('基本示例', function() {
    const obj = {
      info: {
        city: {
          code: '500000',
        },
      },
    }
    const code = '100000'
    const res = set(obj, 'info.city.code', code)
    expect(obj.info.city.code).toBe(code)
    expect(res).toBeTrue()
  })
  it('设置不存在的字段', function() {
    const obj: any = {}
    const code = '100000'
    const res = set(obj, 'info.city.code', code)
    expect(res).toBeFalse()
  })
})
