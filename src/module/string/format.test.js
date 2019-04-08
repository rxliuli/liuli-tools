import { format } from './format'

/**
 * @teset {format}
 */
describe('test format', () => {
  const str = 'name: {name}, age: {age}'
  it('test normal format', () => {
    expect(
      format(str, {
        name: 'rx',
        age: 17
      })
    ).toEqual('name: rx, age: 17')
  })
  it('test format for not arg', () => {
    expect(format(str)).toEqual(str)
  })
})
