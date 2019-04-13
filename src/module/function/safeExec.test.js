import { safeExec } from './safeExec'

/**
 * @test {safeExec}
 */
describe('test safeExec', () => {
  it('test safeExec normal', () => {
    expect(safeExec(() => 10)).toBe(10)
  })
  it('test safeExec throw Error', () => {
    expect(
      safeExec(() => {
        throw new Error()
      })
    ).toBeUndefined()
  })
  it('test safeExec throw Error, and set default value', () => {
    expect(
      safeExec(() => {
        throw new Error()
      }, 10)
    ).toBe(10)
  })
  it('test this', function () {
    this.i = 1
    expect(safeExec(() => this.i * 2, undefined)).toBe(2)
  })
  it('test bind this', function () {
    const obj = { i: 1 }
    const fn = function () {
      return this.i * 2
    }.bind(obj)
    expect(safeExec(fn, undefined)).toBe(2)
  })
})
