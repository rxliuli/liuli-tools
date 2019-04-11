import { fill } from './fill'

/**
 * @test {fill}
 */
describe('test fill', () => {
  it('test fill', () => {
    expect(fill('*', 3)).toEqual('***')
    expect(fill('*', 0)).toEqual('')
  })
})
