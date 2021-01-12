import { timing } from './timing'
import { wait } from '../async/wait'
import { sleep } from './sleep'

/**
 * @test {timing}
 */
describe('test timing', () => {
  it('test timing for normal function', () => {
    const res: number = timing(() => sleep(100))
    expect(res).toBeGreaterThan(99)
  })
  it('test timing for promise function', async () => {
    const res: Promise<number> = timing(async () => wait(100))
    expect(await res).toBeGreaterThan(95)
  })
  it('test this', async function () {
    // @ts-ignore
    this.num = 100
    // @ts-ignore
    expect(await timing(() => wait(this.num))).toBeGreaterThan(95)
  })
})
