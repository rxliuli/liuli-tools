import { compose } from './compose'

describe('test', () => {
  it('simple example', () => {
    const add = (a, b) => a + b
    const mul = (a, b) => a * b
    const div = (a, b) => a / b
    console.log(
      compose(
        add,
        mul,
        div
      )(1, 2)(3)(2)
    )
  })
})
