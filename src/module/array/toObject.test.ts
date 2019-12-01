import { toObject } from './toObject'

/**
 * @test {toObject}
 */
describe('test toObject', () => {
  it('simple example', () => {
    const res = toObject([1, 2, 3], i => i)
    expect(res).toEqual({ 1: 1, 2: 2, 3: 3 })
  })
  it('use vFn', () => {
    const res = toObject(
      [1, 2, 3],
      i => i,
      i => i * 2 + '',
    )
    expect(res).toEqual({ 1: '2', 2: '4', 3: '6' })
  })
})
