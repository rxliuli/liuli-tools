import { bridge } from './bridge'

/**
 * @test {bridge}
 */
describe('test bridge', () => {
  it('simple example', () => {
    const bridgeUser = bridge({ id: 'uid', name: 'uname' })
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
    const bridgeUser = bridge({ id: 'uid', name: 'uname' })
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
    const bridgeUser = bridge({ [id]: uid, name: 'uname' })
    const user = bridgeUser({
      [uid]: 1,
      uname: 'rx',
    })
    // @ts-ignore
    user[id] = 2
    user.name = '琉璃'
    expect(user).toEqual({
      [uid]: 2,
      uname: '琉璃',
    })
  })
})
