import { LineRangeUtil } from './LineRangeUtil'
import { LineRange } from './LineRange'

describe('测试 LineRangeUtil', function () {
  it('测试多个区间是否有重叠', () => {
    const timeRangeList = [
      ['2018-12-11', '2018-12-13'],
      ['2018-12-13', '2018-12-16'],
      ['2018-12-17', '2018-12-18'],
    ]
    expect(
      LineRangeUtil.isOverlap(
        timeRangeList.map((arr) => {
          const [begin, end] = arr.map((str) => new Date(str))
          return LineRange.create(begin, end)
        }),
      ),
    ).toBeFalse()
  })
})
