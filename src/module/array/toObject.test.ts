import { toObject } from './toObject'

/**
 * @test {toObject}
 */
describe('test toObject', () => {
  it('simple example', () =>
    expect(toObject([1, 2, 3], i => i)).toEqual({ 1: 1, 2: 2, 3: 3 }))
})
