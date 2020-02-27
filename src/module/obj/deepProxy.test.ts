import { deepProxy } from './deepProxy'

/**
 * @test {deepProxy}
 */
describe('测试 deepProxy', () => {
  const obj = {
    name: 'rx',
  }
  const type = 'object'
  it('基本示例', () => {
    const proxy = deepProxy(obj)
    expect(typeof proxy.a).toBe(type)
    expect(typeof proxy.a.b).toBe(type)
    expect(typeof proxy.a.b.c).toBe(type)
    expect(proxy.name).toBe('rx')
    expect(proxy.name.name).toBeUndefined()
    expect(() => proxy.name.name.name).toThrowError()
  })
  it('测试无参数', () => {
    const proxy = deepProxy()
    expect(typeof proxy.a.b).toBe('object')
    expect(proxy.a.b.toString()).toBe('')
  })
  it('测试默认值', () => {
    const proxy = deepProxy(obj, '')
    expect(proxy.name).toBe(obj.name)
    expect(proxy.name.name).toBeUndefined()
    expect(proxy.info).toBe('')
  })
})
