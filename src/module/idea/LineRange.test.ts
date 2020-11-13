import { LineRange } from './LineRange'

describe('测试 LineRange', () => {
  it('基本示例', function () {
    const lr1 = LineRange.create(1, 3)
    const lr2 = LineRange.create(2, 4)
    expect(lr1.isOverlap(lr2)).toBeTruthy()
    expect(lr1.overlap(lr2)).toEqual(LineRange.create(2, 3))
  })
  it('测试非基本类型', () => {
    const kFn = (date: Date) => date.getDate()
    const lr1 = LineRange.create(
      new Date(2018, 12, 11),
      new Date(2018, 12, 15),
      kFn,
    )
    const lr2 = LineRange.create(
      new Date(2018, 12, 13),
      new Date(2018, 12, 19),
      kFn,
    )
    expect(lr1.isOverlap(lr2)).toBeTruthy()
    expect(lr1.overlap(lr2)).toEqual(
      LineRange.create(new Date(2018, 12, 13), new Date(2018, 12, 15)),
    )
  })
  it('测试临近的两个区间不重叠', () => {
    function assert(arr: string[][]) {
      const [lr1, lr2] = arr.map(([begin, end]) =>
        LineRange.create(begin, end, (str) => new Date(str).getTime()),
      )
      expect(lr1.isOverlap(lr2)).toBeFalsy()
      expect(() => lr1.overlap(lr2)).toThrowError()
    }

    const arr = [
      ['2018-12-11', '2018-12-13'],
      ['2018-12-13', '2018-12-16'],
    ]
    assert(arr)
    assert(arr.reverse())
  })
})
