import { wait } from './wait'
import { promiseLimit } from './promiseLimit'
import { repeatedCall } from './repeatedCall'

/**
 * @test {promiseLimit}
 */
describe('test promiseLimit', () => {
  it('simple example no limit', async () => {
    let i = 0
    const add = async () => {
      await wait(100)
      i++
    }
    // 调用 5 次
    repeatedCall(5, add)
    // 等待两百毫秒
    await wait(200)
    expect(i).toBe(5)
  })
  it('simple example no limit', async () => {
    let i = 0
    const add = async () => {
      await wait(100)
      i++
    }
    const fn = promiseLimit(add)
    // 调用 5 次
    repeatedCall(5, fn)
    // 等待两百毫秒
    await wait(200)
    expect(i).toBeLessThanOrEqual(2)
  })
  it('test this', async function () {
    this.i = 0
    const add = async () => {
      await wait(100)
      this.i++
    }
    const fn = promiseLimit(add)
    // 调用 5 次
    repeatedCall(5, fn)
    // 等待两百毫秒
    await wait(200)
    expect(this.i).toBeLessThanOrEqual(2)
  })
  it('test this', async function () {
    const obj = { i: 0 }
    const add = async function () {
      await wait(100)
      this.i++
    }
    const fn = promiseLimit(add).bind(obj)
    // 调用 5 次
    repeatedCall(5, fn)
    // 等待两百毫秒
    await wait(200)
    expect(obj.i).toBeLessThanOrEqual(2)
  })
})
