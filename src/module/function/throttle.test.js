import { throttle } from './throttle'
import { waitResource } from './waitResource'
import { wait } from './wait'

/**
 * @test {throttle}
 */
describe('test throttle', () => {
  it('simple example', async () => {
    let num = 0
    const fn = throttle(10, () => num++)
    const now = Date.now()
    await waitResource(() => {
      fn()
      return Date.now() - now > 100
    })
    expect(num).toBeLessThanOrEqual(10)
  })
  it('test this', async function () {
    this.num = 0
    const fn = throttle(10, () => this.num++)
    const now = Date.now()
    await waitResource(() => {
      fn()
      return Date.now() - now > 100
    })
    expect(this.num).toBeLessThanOrEqual(10)
  })
  it('test bind this', async () => {
    const obj = { num: 0 }
    const fn = throttle(10, function () {
      this.num++
    }).bind(obj)
    const now = Date.now()
    await waitResource(() => {
      fn()
      return Date.now() - now > 100
    })
    expect(obj.num).toBeLessThanOrEqual(10)
  })
  it('async and return result', async () => {
    const add = async (a, b) => a + b
    const fn = throttle(10, add)
    fn(1, 2).then(res => expect(res).toBe(3))
    fn(1, 3).then(res => expect(res).toBe(undefined))
    fn(1, 4).then(res => expect(res).toBe(undefined))
    await wait(20)
    fn(1, 5).then(res => expect(res).toBe(6))
    await wait(20)
    fn(1, 3).then(res => expect(res).toBe(4))
  })
})
