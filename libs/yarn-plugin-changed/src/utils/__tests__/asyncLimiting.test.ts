import { asyncLimiting } from '../asyncLimiting'
import { wait } from '../wait'
import { countTime } from '@liuli-util/test'

describe('test asyncLimiting', () => {
  it('simple example', async () => {
    const add = () => wait(100)
    const fn = asyncLimiting(add, 1)
    const time = await countTime(() => Promise.all(Array(10).fill(0).map(fn)))
    expect(time).toBeGreaterThan(1000)
  })
  it('test order', async () => {
    let sum = 0
    const add = async (i: number) => {
      await wait(100)
      sum += i
    }
    const fn = asyncLimiting(add, 1)
    fn(1).then(() => expect(sum).toBe(1))
    fn(2).then(() => expect(sum).toBe(3))
    fn(3).then(() => expect(sum).toBe(6))
    fn(4).then(() => expect(sum).toBe(10))
  })
  it('测试并发数量不会超出限制', async () => {
    let len = 0
    await Promise.all(
      Array(10)
        .fill(0)
        .map(
          asyncLimiting(async (_, i) => {
            len++
            await wait(Math.random() * 100)
            console.log(i, len)
            expect(len <= 2).toBeTruthy()
            len--
          }, 2),
        ),
    )
  }, 1_000)
})
