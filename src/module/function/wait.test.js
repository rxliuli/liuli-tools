import { wait } from './wait'

/**
 * @test {wait}
 */
describe('test wait', () => {
  const time = 500
  const assertTime = start => {
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
  it('test this', async function () {
    this.time = time
    const start = Date.now()
    await wait(() => Date.now() > start + this.time)
    assertTime(start)
  })
})
