import { safeExec } from './safeExec'

/**
 * @test {safeExec}
 */
describe('测试 safeExec', () => {
  it('简单示例', () => {
    expect(safeExec(() => 10)).toBe(10)
  })
  it('test safeExec throw Error', () => {
    const fn: () => number = () => {
      throw new Error()
    }
    expect(safeExec(fn)).toBeNull()
    expect(safeExec(fn, 10)).toBe(10)
  })
  it('测试异步函数', function () {
    async function fn(i: number) {
      if (i > 0) {
        return i
      } else {
        throw new Error('i 必须大于 0')
      }
    }
    expect(safeExec(() => fn(1))).resolves.toBe(1)
    expect(safeExec(() => fn(0))).resolves.toBeNull()
  })
})
