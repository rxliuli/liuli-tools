import { spliceParams } from './spliceParams'
import { dateFormat } from '../date/dateFormat'

/**
 * @test {spliceParams} 测试拼接参数为 url
 */
describe('test spliceParams', () => {
  it('test spliceParams for normal param', () => {
    expect(
      spliceParams({
        name: 'rx',
        age: 17
      })
    ).toBe('name=rx&age=17&')
  })
  it('test spliceParams for Date type', () => {
    const date = new Date()
    expect(
      spliceParams({
        birthday: date
      })
    ).toBe(
      `birthday=${encodeURIComponent(
        dateFormat(date, 'yyyy-MM-ddThh:mm:ss.SSSZ')
      )}&`
    )
  })
  it('test spliceParams for Array type', () => {
    expect(
      spliceParams({
        name: 'rx',
        bent: [1, 2, 3]
      })
    ).toBe(`name=rx&bent=1&bent=2&bent=3&`)
  })
})
