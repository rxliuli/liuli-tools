import { expect, it, describe } from 'vitest'
import { throttle } from '../throttle'
import { wait } from '../wait'

/**
 * @test {throttle}
 */
describe('test throttle', () => {
  it('simple example', async () => {
    let num = 0
    const fn = throttle(() => num++, 10)
    const now = Date.now()

    await wait(() => {
      fn()
      return Date.now() - now > 100
    })

    expect(num).toBeLessThanOrEqual(10)
  })

  it('async and return result', async () => {
    const add = async (a: number, b: number) => a + b
    const fn = throttle(add, 10)
    fn(1, 2).then((res) => expect(res).toBe(3))
    fn(1, 3).then((res) => expect(res).toBe(3))
    fn(1, 4).then((res) => expect(res).toBe(3))
    await wait(20)
    fn(1, 5).then((res) => expect(res).toBe(6))
    await wait(20)
    fn(1, 3).then((res) => expect(res).toBe(4))
  })
})
