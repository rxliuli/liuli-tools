import { waitResource } from './waitResource'

/**
 * @test {waitResource}
 */
describe('test waitResource', () => {
  it('test waitResource', async () => {
    let num = 0
    const now = Date.now()
    await waitResource(
      () => {
        num++
        return Date.now() - now > 1000
      },
      {
        interval: 100,
        max: 10
      }
    )
    expect(Date.now() - now).toBeGreaterThanOrEqual(1000)
    expect(num).toBeLessThanOrEqual(10)
  })
  it('test this', async function () {
    this.num = 0
    const now = Date.now()
    await waitResource(
      () => {
        this.num++
        return Date.now() - now > 1000
      },
      {
        interval: 100,
        max: 10
      }
    )
    expect(Date.now() - now).toBeGreaterThanOrEqual(1000)
    expect(this.num).toBeLessThanOrEqual(10)
  })
})
