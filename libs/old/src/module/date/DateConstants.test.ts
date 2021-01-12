import { DateConstants } from './DateConstants'

/**
 * @test {DateConstants}
 */
describe('test DateConstants', () => {
  it('test get day start', () => {
    const date = DateConstants.dayStart()
    expect(date.getHours()).toBe(0)
    expect(date.getMinutes()).toBe(0)
    expect(date.getSeconds()).toBe(0)
    expect(date.getMilliseconds()).toBe(0)
  })
  it('test get day end', () => {
    const date = DateConstants.dayEnd()
    expect(date.getHours()).toBe(23)
    expect(date.getMinutes()).toBe(59)
    expect(date.getSeconds()).toBe(59)
    expect(date.getMilliseconds()).toBe(999)
  })
  it('test get month start', () => {
    const date = DateConstants.monthStart()
    expect(date.getDate()).toBe(1)
  })
  it('test get month end', () => {
    const date = DateConstants.monthEnd(new Date('2000-02-11'))
    expect(date.getDate()).toBe(29)
  })
  it('test get year start', () => {
    const date = DateConstants.yearStart()
    expect(date.getFullYear()).toBe(new Date().getFullYear())
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(1)
  })
  it('test get year end', () => {
    const date = DateConstants.yearEnd()
    expect(date.getFullYear()).toBe(new Date().getFullYear())
    expect(date.getMonth()).toBe(11)
    expect(date.getDate()).toBe(31)
    expect(date.getHours()).toBe(23)
    expect(date.getMinutes()).toBe(59)
    expect(date.getSeconds()).toBe(59)
    expect(date.getMilliseconds()).toBe(999)
  })
})
