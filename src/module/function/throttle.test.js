import { throttle } from './throttle'
import { waitResource } from './waitResource'

/**
 * @test {throttle}
 */
describe('test throttle', async () => {
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
})
