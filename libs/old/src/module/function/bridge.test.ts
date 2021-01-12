import { bridge } from './bridge'

/**
 * @test {bridge}
 */
describe('test bridge', () => {
  it('simple example', () => {
    //as const 是让 ts 认为是常量，k-v 都是一个字符串字面量类型，而非默认的 string。
    const bridgeUser = bridge({ id: 'uid', name: 'uname' } as const)
    const user = bridgeUser({
      uid: 1,
      uname: 'rx',
    })
    user.id = 2
    user.name = '琉璃'
    expect(user).toEqual({
      uid: 2,
      uname: '琉璃',
    })
  })
  it('test object', () => {
    const bridgeUser = bridge({ id: 'uid', name: 'uname' } as const)
    const user = bridgeUser({
      uid: 1,
      uname: 'rx',
    })
    user.id = 2
    user.name = '琉璃'
    expect(user).toEqual({
      uid: 2,
      uname: '琉璃',
    })
  })
  it('test symbol', () => {
    const id = Symbol('id')
    const uid = Symbol('uid')
    const bridgeUser = bridge({ [id]: uid, name: 'uname' } as const)
    const user = bridgeUser({
      [uid]: 1,
      uname: 'rx',
    })
    user[id] = 2
    user.name = '琉璃'
    expect(user).toEqual({
      [uid]: 2,
      uname: '琉璃',
    })
  })
})
