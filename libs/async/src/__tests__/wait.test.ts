import { wait } from '../wait'
import { timing } from './timing'

/**
 * @test {wait}
 */
describe('test wait', () => {
  const time = 500
  const assertTime = (start: number) => {
    // 注意: 此处是为了兼容误差时间，因为 js 中的 setTimeout 本身就是不准确的
    expect(Date.now() - start).toBeGreaterThanOrEqual(time - 10)
  }
  it('test wait for sepecify time', async () => {
    const start = Date.now()
    await wait(time)
    assertTime(start)
  })
  it('test wait for sepecify function', async () => {
    const start = Date.now()
    await wait(() => Date.now() > start + time)
    assertTime(start)
  })
  it('test wait for not sepecify parameter', async () => {
    const start = Date.now()
    await wait()
    expect(Date.now() - start).toBeLessThan(100)
  })
  it('test Promise.all', async () => {
    let flag = false
    const add = async () => {
      if (flag) {
        await wait(() => {
          const result = !flag
          flag = true
          return result
        })
      }
      try {
        // 注意: 这里的 i++ 实际上是异步的
        flag = true
        await wait(100)
      } finally {
        flag = false
      }
    }

    const time = await timing(() => Promise.all(Array(10).fill(0).map(add)))
    expect(time).toBeGreaterThan(1000)
  })
})
