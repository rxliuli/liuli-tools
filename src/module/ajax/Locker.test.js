import { wait } from '../function/wait'
import { Locker } from './Locker'
import { range } from '../array/range'

/**
 * @test {Locker}
 */
describe('test Locker', () => {
  it('simple example', async () => {
    const locker = new Locker()
    const fn = async () => {
      try {
        await locker.lock()
        await wait(300)
      } finally {
        locker.unlock()
      }
    }
    const start = Date.now()
    await Promise.all(range(1, 10).map(fn))
    expect(Date.now() - start).toBeGreaterThan(3000)
  })
})
