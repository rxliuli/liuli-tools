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
})
