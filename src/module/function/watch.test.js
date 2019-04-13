import { watch } from './watch'

/**
 * @test {watch}
 */
describe('test watch', () => {
  it('test watch for simple example', () => {
    let now
    watch(
      () => Date.now(),
      () => {
        expect(Date.now() - now).toBeLessThan(1000)
        now = Date.now()
      }
    )
  })
  it('test watch for closing', () => {
    const start = Date.now()
    const close = watch(
      () => Date.now(),
      () => {
        if (Date.now() - start > 1000) {
          close()
        }
      }
    )
  })
  it('test watch for dependent on external conditions', () => {
    const interval = 100
    const max = 10
    let num = 0
    const now = Date.now()
    // 随着时间改变 num 的值
    setInterval(() => num++, interval)
    watch(
      // 监视 num 的值
      () => num > max,
      () => {
        expect(num).toBe(10)
        expect(Date.now() - now).toBeGreaterThan(1000)
      }
    )
  })
  it('test this', function () {
    this.now = 0
    watch(
      () => Date.now(),
      () => {
        expect(Date.now() - this.now).toBeLessThan(1000)
        this.now = Date.now()
      }
    )
  })
})
