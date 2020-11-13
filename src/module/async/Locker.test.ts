import { wait } from './wait'
import { Locker } from './Locker'
import { randomInt } from '../number/randomInt'
import { repeatedCall } from '../function/repeatedCall'

/**
 * @test {Locker}
 */
describe('test Locker', () => {
  it('simple example', async () => {
    const locker = new Locker()
    const fn = async () => {
      try {
        await locker.lock()
        await wait(100)
      } finally {
        locker.unlock()
      }
    }
    const start = Date.now()
    await Promise.all(repeatedCall(10, fn))
    expect(Date.now() - start).toBeGreaterThan(1000)
  })
  it('test order', async () => {
    const locker = new Locker()
    let sum = 0
    const add = async (i: number) => {
      try {
        await locker.lock()
        await wait(randomInt(100))
        sum += i
        return sum
      } finally {
        locker.unlock()
      }
    }
    await expect(
      Promise.all([add(1), add(2), add(3), add(4)]),
    ).resolves.toEqual([1, 3, 6, 10])
  })
})
