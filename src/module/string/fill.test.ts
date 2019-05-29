import { fill } from './fill'

/**
 * @test {fill}
 */
describe('test fill', () => {
  it('simple example', () => {
    expect(fill('*', 3)).toEqual('***')
    expect(fill('*', 0)).toEqual('')
  })
})
