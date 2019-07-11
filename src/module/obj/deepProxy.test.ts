import { deepProxy } from './deepProxy'

/**
 * @test {deepProxy}
 */
describe('test deepProxy', () => {
  const obj = {
    name: 'rx',
  }
  it('simple example', () => {
    const proxy = deepProxy(obj)
    const type = 'object'
    expect(typeof proxy.a).toBe(type)
    expect(typeof proxy.a.b).toBe(type)
    expect(typeof proxy.a.b.c).toBe(type)
    expect(proxy.name).toBe('rx')
    expect(proxy.name.name).toBeUndefined()
    expect(() => proxy.name.name.name).toThrowError()
  })
  it('custom default value', () => {
    const proxy = deepProxy(obj, '')
    expect(proxy.name).toBe(obj.name)
    expect(proxy.name.name).toBeUndefined()
    expect(proxy.info).toBe('')
  })
})
