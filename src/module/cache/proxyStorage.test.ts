import { proxyStorage } from './proxyStorage'

describe('测试 proxyStorage', () => {
  const store = proxyStorage<{
    name: string
    age: number
    address: { city: string }
    hobby: string[]
  }>(localStorage)
  it('基本示例', () => {
    store.name = 'liuli'
    expect(store.name).toBe('liuli')
    store.age = 5
    expect(store.age).toBe(5)

    store.address = {
      city: 'HongKong',
    }
    expect(store.address).toEqual({
      city: 'HongKong',
    })

    store.hobby = ['game', 'movie']
    expect(store.hobby).toEqual(['game', 'movie'])
  })
})
