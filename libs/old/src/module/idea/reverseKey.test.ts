import { reverseKeyValue } from './reverseKey'

describe('测试 reverseKeyValue', () => {
  it('基本示例', () => {
    const res = reverseKeyValue({
      white: '#FFF',
      black: '#000',
      red: '#FF0000',
    })
    expect(res).toEqual({ '#FFF': 'white', '#000': 'black', '#FF0000': 'red' })
  })
  it('测试非 Object key 属性值', () => {
    const res = reverseKeyValue({
      name: 1,
      info: {
        address: 'address',
      } as any,
    })
    expect(res).toEqual({
      1: 'name',
    })
  })
  it('测试 undefined 和 null', () => {
    const res = reverseKeyValue({
      name: 1,
      age: null as any,
      sex: undefined as any,
    })
    expect(res).toEqual({
      1: 'name',
    })
  })
  it('测试重复的值', () => {
    const res = reverseKeyValue({
      name: 'rx',
      age: 1,
      sex: 1,
    })
    expect(res).toEqual({
      rx: 'name',
      1: 'sex',
    })
  })
})
