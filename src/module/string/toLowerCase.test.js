import { toLowerCase } from './toLowerCase'

/**
 * @test {toLowerCase}
 */
describe('test toLowerCase', () => {
  it('test toLowerCase', () => {
    expect(toLowerCase('STR')).toBe('str')
    expect(toLowerCase('Str')).toBe('str')
  })
  it('test toLowerCase for undefined', () => {
    expect(toLowerCase()).toBe(undefined)
  })
})
