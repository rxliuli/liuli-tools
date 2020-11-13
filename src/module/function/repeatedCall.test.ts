import { repeatedCall } from './repeatedCall'
import { emptyFunc } from './emptyFunc'
import { async } from '../async/async'

/**
 * @test {repeatedCall}
 */
describe('test repeatedCall', () => {
  const len = 5
  it('simple example', () => {
    let i = 1
    expect(repeatedCall(len, () => i++)).toEqual([1, 2, 3, 4, 5])
    expect(i).toBe(6)
  })
  it('async function', async () => {
    const mockFn = jest.fn(async(emptyFunc))
    const arr = repeatedCall(len, mockFn)
    arr.forEach((item) => expect(item).toBeInstanceOf(Promise))
    await Promise.all(arr)
    expect(mockFn.mock.calls.length).toBe(len)
  })
  it('test this', function () {
    // @ts-ignore
    this.i = 1
    // @ts-ignore
    expect(repeatedCall(len, () => this.i++)).toEqual([1, 2, 3, 4, 5])
    // @ts-ignore
    expect(this.i).toBe(6)
  })
  it('test bind this', function () {
    const obj = { i: 1 }
    expect(
      repeatedCall(
        len,
        function () {
          // @ts-ignore
          return this.i++
        }.bind(obj),
      ),
    ).toEqual([1, 2, 3, 4, 5])
    expect(obj.i).toBe(6)
  })
})
