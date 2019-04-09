import { dateBetween } from './dateBetween'

/**
 * @test {dateBetween}
 */
describe('test dateBetween', () => {
  it('test simple example', () => {
    const between = dateBetween(new Date('2018-12-11'), new Date('2019-12-11'))
    expect(between.milliSecond()).toBe(365 * 24 * 60 * 60 * 1000)
    expect(between.second()).toBe(365 * 24 * 60 * 60)
    expect(between.minute()).toBe(365 * 24 * 60)
    expect(between.hour()).toBe(365 * 24)
    expect(between.day()).toBe(365)
    expect(between.month()).toBe(12)
    expect(between.year()).toBe(1)
  })

  it('test negative value', () => {
    const between = dateBetween(new Date('2019-01-01'), new Date('2018-12-30'))
    expect(between.year()).toBe(-1)
    expect(between.day()).toBe(-2)
  })

  it('test decimals', () => {
    const between = dateBetween(
      new Date('2018-12-11T00:00:00.000'),
      new Date('2019-12-11T01:10:10.100')
    )
    expect(between.milliSecond()).toBe(
      (((365 * 24 + 1) * 60 + 10) * 60 + 10) * 1000 + 100
    )
    expect(between.second()).toBe(((365 * 24 + 1) * 60 + 10) * 60 + 10)
    expect(between.minute()).toBe((365 * 24 + 1) * 60 + 10)
    expect(between.hour()).toBe(365 * 24 + 1)
    expect(between.day()).toBe(365)
    expect(between.month()).toBe(12)
    expect(between.year()).toBe(1)
  })
})
