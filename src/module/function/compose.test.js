import { compose } from './compose'

describe('test', () => {
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
})
