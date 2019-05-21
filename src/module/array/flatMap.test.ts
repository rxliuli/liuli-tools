import { flatMap } from './flatMap'
import { range } from './range'

/**
 * @test {flatMap}
 */
describe('test flatMap', () => {
  it('test simple example', () => {
    expect(flatMap(range(1, 4), i => range(1, i + 1))).toIncludeAllMembers([
      1,
      1,
      2,
      1,
      2,
      3,
    ])
  })
  it('use default fn', () => {
    expect(flatMap(['a', 'bc', 'd', 'efg'])).toIncludeAllMembers([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
    ])
  })
})
