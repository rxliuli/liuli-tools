import { wait } from './wait'

/**
 * @test {wait}
 */
describe('test wait', () => {
  const time = 1000
  it('test wait for sepecify time', async () => {
    const start = Date.now()
    await wait(time)
    expect(Date.now() - start).toBeGreaterThanOrEqual(time)
  })
  it('test wait for sepecify function', async () => {
    const start = Date.now()
    await wait(() => Date.now() > start + time)
    expect(Date.now() - start).toBeGreaterThanOrEqual(time)
  })
  it('test wait for not sepecify parameter', async () => {
    const start = Date.now()
    await wait()
    expect(Date.now() - start).toBeLessThan(100)
  })
})
