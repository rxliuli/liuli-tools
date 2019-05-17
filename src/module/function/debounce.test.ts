import { wait } from './wait'
import { debounce } from './debounce'
import { repeatedCall } from './repeatedCall'

/**
 * @test {debounce}
 */
describe('test debounce', () => {
  it('simple example', async () => {
    let num = 0
    const fn = debounce(10, () => num++)
    repeatedCall(3, fn)
    await wait(20)
    expect(num).toBe(1)
    fn()
    await wait(20)
    expect(num).toBe(2)
  })
  it('test this', async function () {
    this.num = 0
    const fn = debounce(10, () => this.num++)
    repeatedCall(3, fn)
    await wait(20)
    expect(this.num).toBe(1)
    fn()
    await wait(20)
    expect(this.num).toBe(2)
  })
  it('test for bind this', async function () {
    const obj = { num: 0 }
    const fn = debounce(10, function () {
      return this.num++
    }).bind(obj)
    repeatedCall(3, fn)
    await wait(20)
    expect(obj.num).toBe(1)
    fn()
    await wait(20)
    expect(obj.num).toBe(2)
  })
  it('async and return result', async () => {
    const add = async (a, b) => a + b
    const fn = debounce(10, add, 0)
    // 这里没有使用 await 的原因是因为会造成顺序执行
    fn(1, 2).then(res => expect(res).toBe(0))
    fn(1, 3).then(res => expect(res).toBe(0))
    fn(1, 4).then(res => expect(res).toBe(0))
    fn(1, 5).then(res => expect(res).toBe(0))
    fn(1, 4).then(res => expect(res).toBe(5))

    await wait(200)
    fn(1, 3).then(res => expect(res).toBe(4))
  })
})
