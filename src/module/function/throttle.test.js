import { throttle } from './throttle'
import { waitResource } from './waitResource'

/**
 * @test {throttle}
 */
describe('test throttle', () => {
  it('simple example', async () => {
    let num = 0
    const fn = throttle(100, () => num++)
    const now = Date.now()
    await waitResource(() => {
      fn()
      return Date.now() - now > 1000
    })
    expect(num).toBeLessThanOrEqual(10)
  })
  it('test this', async function () {
    this.num = 0
    const fn = throttle(100, () => this.num++)
    const now = Date.now()
    await waitResource(() => {
      fn()
      return Date.now() - now > 1000
    })
    expect(this.num).toBeLessThanOrEqual(10)
  })
  it('test bind this', async () => {
    const obj = { num: 0 }
    const fn = throttle(100, function () {
      this.num++
    }).bind(obj)
    const now = Date.now()
    await waitResource(() => {
      fn()
      return Date.now() - now > 1000
    })
    expect(obj.num).toBeLessThanOrEqual(10)
  })
})
