import { wait } from './wait'
import { debounce } from './debounce'
import { repeatedCall } from './repeatedCall'

/**
 * @test {debounce}
 */
describe('test debounce', () => {
  it('simple example', async () => {
    let num = 0
    const fn = debounce(100, () => num++)
    repeatedCall(3, fn)
    await wait(200)
    expect(num).toBe(1)
    fn()
    await wait(200)
    expect(num).toBe(2)
  })
  it('test this', async function () {
    this.num = 0
    const fn = debounce(100, () => this.num++)
    repeatedCall(3, fn)
    await wait(200)
    expect(this.num).toBe(1)
    fn()
    await wait(200)
    expect(this.num).toBe(2)
  })
  it('test for bind this', async function () {
    const obj = { num: 0 }
    const fn = debounce(100, function () {
      return this.num++
    }).bind(obj)
    repeatedCall(3, fn)
    await wait(200)
    expect(obj.num).toBe(1)
    fn()
    await wait(200)
    expect(obj.num).toBe(2)
  })
})
