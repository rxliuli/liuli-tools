import { asyncLimiting } from './asyncLimiting'
import { wait } from '../function/wait'
import { range } from '../array/range'
import { timing } from '../function/timing'

describe('test asyncLimiting', () => {
  it('simple example', async () => {
    const add = () => wait(100)
    // @ts-ignore
    const fn = asyncLimiting(add)
    const time = await timing(() => Promise.all(range(0, 10).map(i => fn(i))))
    expect(time).toBeGreaterThan(1000)
  })
  it('test order', async () => {
    let sum = 0
    const add = async (i: number) => {
      await wait(100)
      sum += i
    }
    const fn = asyncLimiting(add)
    fn(1).then(() => expect(sum).toBe(1))
    fn(2).then(() => expect(sum).toBe(3))
    fn(3).then(() => expect(sum).toBe(6))
    fn(4).then(() => expect(sum).toBe(10))
  })
})
