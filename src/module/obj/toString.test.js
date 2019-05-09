import { toString } from './toString'

/**
 * @test {toString}
 */
describe('test toString', () => {
  it('simple example', () => {
    expect(toString(1)).toEqual('1')
    expect(toString()).toEqual(undefined)
    expect(toString(null)).toEqual(null)
    expect(toString(Symbol(1))).toEqual('Symbol(1)')
  })
})
