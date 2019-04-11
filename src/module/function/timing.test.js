import { timing } from './timing'
import { wait } from './wait'

/**
 * @test {timing}
 */
describe('test timing', () => {
  it('test timing for normal function', () => {
    const fn = () => {
      let now = Date.now()
      while (true) {
        if (Date.now() - now > 1000) {
          break
        }
      }
    }
    expect(timing(fn)).toBeGreaterThan(900)
  })

  it('test timing for promise function', async () => {
    expect(await timing(() => wait(1000))).toBeGreaterThan(1000)
  })
})
