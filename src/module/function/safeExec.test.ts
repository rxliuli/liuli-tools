import { safeExec } from './safeExec'

/**
 * @test {safeExec}
 */
describe('test safeExec', () => {
  it('test safeExec normal', () => {
    expect(safeExec(() => 10)).toBe(10)
  })
  it('test safeExec throw Error', () => {
    const fn: () => number = () => {
      throw new Error()
    }
    expect(safeExec(fn)).toBeNull()
    expect(safeExec(fn, 10)).toBe(10)
  })
  it('test this', function() {
    // @ts-ignore
    this.i = 1
    // @ts-ignore
    expect(safeExec(() => this.i * 2, undefined)).toBe(2)
  })
  it('test bind this', function() {
    const obj = { i: 1 }
    const fn = function() {
      // @ts-ignore
      return this.i * 2
    }.bind(obj)
    expect(safeExec(fn, undefined)).toBe(2)
  })
})
