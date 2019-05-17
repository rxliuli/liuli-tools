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
        if (Date.now() - now > 100) {
          break
        }
      }
    }
    expect(timing(fn)).toBeGreaterThan(99)
  })
  it('test timing for promise function', async () => {
    expect(await timing(() => wait(100))).toBeGreaterThan(95)
  })
  it('test this', async function () {
    this.num = 100
    expect(await timing(() => wait(this.num))).toBeGreaterThan(95)
  })
})
