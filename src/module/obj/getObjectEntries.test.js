import { getObjectEntries } from './getObjectEntries'

/**
 * @test {getObjectEntries}
 */
describe('test getObjectEntries', () => {
  it('simple example', () => {
    const symbol = Symbol('name')
    const name = 'name'
    expect(
      getObjectEntries({
        [symbol]: name,
        [name]: symbol,
      })
    ).toIncludeAllMembers([[symbol, name], [name, symbol]])
  })
})
