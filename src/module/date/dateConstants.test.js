import { dateConstants } from './dateConstants'
/**
 * @test {dateConstants}
 */
describe('test dateConstants', () => {
  it('test get day start', () => {
    const date = dateConstants.dayStart()
    expect(date.getHours()).toBe(0)
    expect(date.getMinutes()).toBe(0)
    expect(date.getSeconds()).toBe(0)
    expect(date.getMilliseconds()).toBe(0)
  })
  it('test get day end', () => {
    const date = dateConstants.dayEnd()
    expect(date.getHours()).toBe(23)
    expect(date.getMinutes()).toBe(59)
    expect(date.getSeconds()).toBe(59)
    expect(date.getMilliseconds()).toBe(999)
  })
  it('test get year start', () => {
    const date = dateConstants.yearStart()
    expect(date.getFullYear()).toBe(new Date().getFullYear())
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(1)
  })
  it('test get year end', () => {
    const date = dateConstants.yearEnd()
    expect(date.getFullYear()).toBe(new Date().getFullYear())
    expect(date.getMonth()).toBe(11)
    expect(date.getDate()).toBe(31)
    expect(date.getHours()).toBe(23)
    expect(date.getMinutes()).toBe(59)
    expect(date.getSeconds()).toBe(59)
    expect(date.getMilliseconds()).toBe(999)
  })
})
