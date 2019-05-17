import { emptyFunc } from './emptyFunc'

/**
 * @test {emptyFunc}
 */
describe('test emptyFunc', () => {
  it('simple example', () => {
    expect(emptyFunc()).toBeUndefined()
    expect(emptyFunc(null)).toBeUndefined()
    expect(emptyFunc(1, 2, 3)).toBeUndefined()
  })
})
