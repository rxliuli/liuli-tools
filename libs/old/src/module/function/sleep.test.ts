import { timing } from './timing'
import { sleep } from './sleep'
import { wait } from '../async/wait'

/**
 * @test {sleep}
 */
describe('test sleep', () => {
  it('simple example', () => {
    expect(timing(() => sleep(100))).toBeGreaterThanOrEqual(100)
  })
  it('test async queue', async () => {
    const mockFn = jest.fn()
    wait(0).then(mockFn)
    sleep(10)
    expect(mockFn.mock.calls.length).toBe(0)
    await wait(0)
    expect(mockFn.mock.calls.length).toBe(1)
  })
})
