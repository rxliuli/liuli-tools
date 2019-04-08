import { toUpperCase } from './toUpperCase'

/**
 * @test {toUpperCase}
 */
describe('test toUpperCase', () => {
  it('test toUpperCase for normal string', () => {
    expect(toUpperCase('str')).toBe('STR')
    expect(toUpperCase('Str')).toBe('STR')
  })
  it('test toUpperCase for other type', () => {
    const user = {
      name: 'rx',
      age: 17
    }
    expect(toUpperCase(user)).toBe(user)
  })
  it('test toUpperCase for undefined', () => {
    expect(toUpperCase()).toBe(undefined)
  })
})
