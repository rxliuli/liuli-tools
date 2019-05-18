import { timing } from './timing'
import { wait } from './wait'

/**
 * @test {timing}
 */
describe('test timing', () => {
  it('test timing for normal function', () => {
    const fn = () => {
      const now = Date.now()
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
  it('test this', async function() {
    // @ts-ignore
    this.num = 100
    // @ts-ignore
    expect(await timing(() => wait(this.num))).toBeGreaterThan(95)
  })
})
