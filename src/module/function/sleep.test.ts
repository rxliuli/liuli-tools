import { timing } from './timing'
import { sleep } from './sleep'
import { wait } from './wait'

/**
 * @test {sleep}
 */
describe('test sleep', () => {
  it('simple example', () => {
    expect(timing(() => sleep(100))).toBeGreaterThanOrEqual(100)
  })
  it('test async queue', async () => {
    let i = 0
    wait(0).then(() => i++)
    sleep(10)
    expect(i).toBe(0)
    await wait(0)
    expect(i).toBe(1)
  })
})
