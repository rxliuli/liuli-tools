import { watch } from './watch'
import { wait } from '../async/wait'

/**
 * @test {watch}
 */
describe('test watch', () => {
  it.skip('test watch for simple example', () => {
    let now: number
    watch(
      () => Date.now(),
      () => {
        expect(Date.now() - now).toBeLessThan(200)
        now = Date.now()
      },
    )
  })
  it('test watch for closing', async () => {
    const start = Date.now()
    let num = 0
    const close = watch(
      () => Date.now(),
      () => {
        // 大于 100ms 就关闭
        if (Date.now() - start > 100) {
          close()
        }
        num++
      },
    )
    await wait(10)
    const temp1 = num
    await wait(200)
    const temp2 = num
    await wait(100)
    const temp3 = num
    expect(temp1).not.toBe(temp2)
    expect(temp2).toBe(temp3)
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
      },
    )
  })
  it('test this', function() {
    // @ts-ignore
    this.now = 0
    watch(
      () => Date.now(),
      () => {
        // @ts-ignore
        expect(Date.now() - this.now).toBeLessThan(1000)
        // @ts-ignore
        this.now = Date.now()
      },
    )
  })
})
