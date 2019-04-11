// eslint-disable-next-line import/no-duplicates
import * as rx from './main'
// eslint-disable-next-line import/no-duplicates
import { dateFormat } from './main'

/**
 * @test {main}
 */
describe('test main', () => {
  it('test dateFormat for global object rx', () => {
    expect(rx.dateFormat).not.toBeNull()
  })

  it('test main, use dateFormat for import {}', () => {
    const str = '2019-12-11'
    expect(dateFormat(new Date(str), 'yyyy-MM-dd')).toBe(str)
  })
})
