import { PubSubMachine } from './PubSubMachine'

describe('test PubSubMachine', () => {
  it('simple example', () => {
    let num = 0
    const hub = new PubSubMachine()
    const fn1 = () => num++
    hub.sub('now', fn1)
    const fn2 = () => num++
    hub.sub('now', fn2)
    const fn3 = () => num++
    hub.sub('now', fn3)

    // 最开始 num 是 0
    expect(num).toBe(0)

    // 发布了一次之后因为有三个订阅所以 +3
    hub.pub('now')
    expect(num).toBe(3)

    // 取消第三个订阅再发布，+2
    hub.unsub('now', fn3)
    hub.pub('now')
    expect(num).toBe(5)

    // 取消订阅不指定函数再发布，不变
    hub.unsub('now')
    hub.pub('now')
    expect(num).toBe(5)
  })
})
