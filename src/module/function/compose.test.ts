import { compose } from './compose'
import { curry } from '../../index'

/**
 * @test {compose}
 */
describe('test compose', () => {
  it('simple example', () => {
    const add = (a, b) => a + b
    const mul = (a, b) => a * b
    const div = (a, b) => a / b
    // 连接多个
    expect(
      compose(
        add,
        mul,
        div
      )(1)(2)(3)(2)
    ).toBe(4.5)
    // 等价于
    expect(
      compose(
        add,
        compose(
          mul,
          div
        )
      )(1)(2)(3)(2)
    ).toBe(4.5)
  })
  it('test multi paramater', () => {
    const add = (a, b, c) => a + b + c
    const mul = (a, b, c) => a * b * c
    const div = (a, b, c) => a / b / c
    const fn = compose(
      add,
      mul,
      div
    )
    // 测试标准参数
    expect(fn(1, 1, 1)(2, 2)(2, 3)).toBe(2)
    // 测试柯里化参数
    expect(fn(1)(1)(1)(2)(2)(2)(3)).toBe(2)
    // 测试占位符
    expect(fn(1)(1)(1)(2)(2)(curry._, 2)(3)).toBe(2)
  })
})
