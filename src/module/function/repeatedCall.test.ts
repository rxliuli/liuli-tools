import { repeatedCall } from './repeatedCall'

/**
 * @test {repeatedCall}
 */
describe('test repeatedCall', () => {
  it('simple example', () => {
    let i = 1
    expect(repeatedCall(5, () => i++)).toIncludeSameMembers([1, 2, 3, 4, 5])
    expect(i).toBe(6)
  })
  it('async function', async () => {
    let i = 1
    const arr = repeatedCall(5, async () => i++)
    expect(arr).toSatisfyAll(res => res instanceof Promise)
    await Promise.all(arr)
    expect(i).toBe(6)
  })
  it('test this', function() {
    // @ts-ignore
    this.i = 1
    // @ts-ignore
    expect(repeatedCall(5, () => this.i++)).toIncludeSameMembers([
      1,
      2,
      3,
      4,
      5,
    ])
    // @ts-ignore
    expect(this.i).toBe(6)
  })
  it('test bind this', function() {
    const obj = { i: 1 }
    expect(
      repeatedCall(
        5,
        function() {
          // @ts-ignore
          return this.i++
        }.bind(obj),
      ),
    ).toIncludeSameMembers([1, 2, 3, 4, 5])
    expect(obj.i).toBe(6)
  })
})
