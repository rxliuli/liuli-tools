import { getYearWeek } from './getYearWeek'

/**
 * @test {getYearWeek}
 */
describe('test getYearWeek', () => {
  it('测试普通情况', () => {
    const day = getYearWeek(new Date('2019-04-08'))
    expect(day).toBe(13)
  })
})
