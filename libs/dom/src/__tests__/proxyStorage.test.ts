import { proxyStorage } from '../proxyStorage'

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
  it('测试深层属性', () => {
    type User = { username: string; password: string }
    const storage = proxyStorage<{
      user: User
    }>(localStorage)
    expect(storage.user).toBeNull()
    const user = {
      username: 'li',
      password: '',
    }
    storage.user = user
    expect(storage.user).toEqual(user)
    expect(storage.user.password).toEqual('')
    storage.user = {
      ...storage.user,
      password: '123456',
    }
    expect(storage.user.password).toEqual('123456')
  })
  it('测试类型', () => {
    const store = proxyStorage<{ a: { b: { c: string } } }>(localStorage)
    const data = store.a!.b.c
    type S = typeof data // string
    // 下面这行会有类型错误 TS2540: Cannot assign to 'c' because it is a read-only property
    // store.a!.b.c = 'str'
  })
})
