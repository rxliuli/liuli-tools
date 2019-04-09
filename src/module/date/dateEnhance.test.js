import { dateEnhance } from './dateEnhance'
/**
 * @test {dateEnhance}
 */
describe('test dateEnhance', () => {
  it('test simple example', () => {
    const date = new Date('2019-02-08T12:11:10.111')
    const enhance = dateEnhance(date)
    expect(enhance.year()).toBe(2019)
    expect(enhance.month()).toBe(1)
    expect(enhance.dayOfMonth()).toBe(8)
    expect(enhance.dayOfYear()).toBe(38)
    expect(enhance.dayOfWeek()).toBe(5)
    expect(enhance.weekOfMonth()).toBe(2)
    expect(enhance.weekOfYear()).toBe(6)
    expect(enhance.quarter()).toBe(1)
    expect(enhance.hour()).toBe(12)
    expect(enhance.minute()).toBe(11)
    expect(enhance.second()).toBe(10)
    expect(enhance.milliSecond()).toBe(111)
  })
  it('test quarter', () => {
    expect(dateEnhance(new Date('2018-01')).quarter()).toBe(1)
    expect(dateEnhance(new Date('2018-05')).quarter()).toBe(2)
    expect(dateEnhance(new Date('2018-09')).quarter()).toBe(3)
    expect(dateEnhance(new Date('2018-12')).quarter()).toBe(4)
  })
})
