import { autoIncrement } from './autoIncrement'

/**
 * @test {autoIncrement}
 */
describe('test autoIncrement', () => {
  it('simple example', () => {
    let i = 0
    expect(autoIncrement()).toBe(i++)
    expect(autoIncrement()).toBe(i++)
    expect(autoIncrement()).toBe(i++)
    expect(autoIncrement()).toBe(i++)
  })
})
