import { get } from './get'

describe('测试 get', () => {
  const obj = {
    id: 1,
    info: {
      address: {
        city: '广州',
      },
    },
    hobby: [
      {
        id: 1,
        name: '动画',
      },
      {
        id: 2,
        name: '小说',
      },
    ],
  }
  it('简单示例', function() {
    expect(get(obj, 'id')).toBe(1)
    expect(get(obj, 'info.address')).toEqual({ city: '广州' })
    expect(get(obj, 'info.address.city')).toBe('广州')
    expect(get(obj, 'hobby.0')).toEqual({ id: 1, name: '动画' })
    expect(get(obj, 'hobby[0]')).toEqual({ id: 1, name: '动画' })
    expect(get(obj, 'hobby[0].name')).toBe('动画')
  })
  it('测试默认值', () => {
    expect(get(obj, 'uid')).toBeNull()
    expect(get(obj, 'in.name')).toBeNull()
    const defVal = '默认值'
    expect(get(obj, 'uid', defVal)).toBe(defVal)
  })
})
