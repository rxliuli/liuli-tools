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
        await wait(100)
      } finally {
        locker.unlock()
      }
    }
    const start = Date.now()
    await Promise.all(range(1, 10).map(fn))
    expect(Date.now() - start).toBeGreaterThan(1000)
  })
  it('test order', async () => {
    const locker = new Locker()
    let sum = 0
    const add = async (i: number) => {
      try {
        locker.lock()
        await wait(100)
        sum += i
      } finally {
        locker.unlock()
      }
    }
    add(1).then(() => expect(sum).toBe(1))
    add(2).then(() => expect(sum).toBe(3))
    add(3).then(() => expect(sum).toBe(6))
    add(4).then(() => expect(sum).toBe(10))
  })
})
