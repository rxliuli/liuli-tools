import { wait } from '../wait'
import { debounce } from '../debounce'

function repeatedCall<T extends (...args: any[]) => any>(
  num: number,
  fn: T,
  ...args: Parameters<T>
): ReturnType<T>[] {
  return Array(num)
    .fill(0)
    .map(() => fn(...(args as any)))
}

/**
 * @test {debounce}
 */
describe('test debounce', () => {
  it('simple example', async () => {
    let num = 0
    const fn = debounce(() => num++, 10)
    repeatedCall(3, fn)
    await wait(20)
    expect(num).toBe(1)
    fn()
    await wait(20)
    expect(num).toBe(2)
  })
  it('test this', async function () {
    // @ts-ignore
    this.num = 0
    // @ts-ignore
    const fn = debounce(() => this.num++, 10)
    repeatedCall(3, fn)
    await wait(20)
    // @ts-ignore
    expect(this.num).toBe(1)
    fn()
    await wait(20)
    // @ts-ignore
    expect(this.num).toBe(2)
  })
  it('async and return result', async () => {
    const add = async (a: number, b: number) => a + b
    const fn = debounce(add, 10, 0)
    // 这里没有使用 await 的原因是因为会造成顺序执行
    fn(1, 2).then((res) => expect(res).toBe(0))
    fn(1, 3).then((res) => expect(res).toBe(0))
    fn(1, 4).then((res) => expect(res).toBe(0))
    fn(1, 5).then((res) => expect(res).toBe(0))
    fn(1, 4).then((res) => expect(res).toBe(5))

    await wait(200)
    fn(1, 3).then((res) => expect(res).toBe(4))
  })
})
