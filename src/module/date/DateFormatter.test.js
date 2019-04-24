import { DateFormatter } from './DateFormatter'

/**
 * @test {DateFormatter}
 */
describe('test DateFormatter', () => {
  it('simple example', () => {
    const str = '2019-12-11'
    const dateFormatter = new DateFormatter('yyyy-MM-dd')
    const date = dateFormatter.parse(str)
    expect(date).toBeValidDate()
    expect(dateFormatter.format(date)).toBe(str)
  })
  it('test string to string', () => {
    const dateFormatter = new DateFormatter('yyyy-MM-dd')
    expect(dateFormatter.strFormat('2019-12-11T12:11:11.111')).toBe(
      '2019-12-11'
    )
  })
  it('test string to string for enum', () => {
    const str = '2019-12-11T12:11:11.111'
    expect(
      DateFormatter.dateFormatter.strFormat(str, 'yyyy-MM-ddThh:mm:ss.SSS')
    ).toBe('2019-12-11')
    expect(DateFormatter.timeFormatter.strFormat(str)).toBe('12:11:11')
    expect(DateFormatter.dateTimeFormatter.strFormat(str)).toBe(
      '2019-12-11 12:11:11'
    )
  })
})
