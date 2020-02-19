import { RectUtil, SimpleRect } from './Rect'
import { flatMap } from '../array/flatMap'

describe('测试 Rect', () => {
  const point1 = {
    x: 1,
    y: 1,
  }
  const point2 = {
    x: 3,
    y: 3,
  }
  const point3 = {
    x: 2,
    y: 2,
  }
  const point4 = {
    x: 4,
    y: 4,
  }
  describe('测试是否相交', () => {
    it('基本示例', () => {
      expect(
        new SimpleRect(point1, point2).isOverlap(
          new SimpleRect(point3, point4),
        ),
      ).toBe(true)
      expect(
        new SimpleRect(point1, point3).isOverlap(
          new SimpleRect(point2, point4),
        ),
      ).toBe(false)
    })
  })
  describe('测试相交矩形', () => {
    it('基本示例', () => {
      expect(
        new SimpleRect(point1, point2).overlap(new SimpleRect(point3, point4)),
      ).toEqual(new SimpleRect(point2, point3))
      expect(() =>
        new SimpleRect(point1, point3).overlap(new SimpleRect(point2, point4)),
      ).toThrowError()
    })
  })
  describe('测试 RectUtil', () => {
    it('基本示例', () => {
      expect(
        RectUtil.isOverlap([
          new SimpleRect(point1, point2),
          new SimpleRect(point3, point4),
        ]),
      ).toBe(true)
      expect(
        RectUtil.isOverlap([
          new SimpleRect(point1, point3),
          new SimpleRect(point2, point4),
        ]),
      ).toBe(false)
    })
    it('测试计算相交矩形', () => {
      const rect1 = new SimpleRect(point1, point2)
      const rect2 = new SimpleRect(point1, point3)
      const rect3 = new SimpleRect(point2, point4)
      const overlapRects = RectUtil.overlap([rect1, rect2, rect3])
      expect(
        flatMap(overlapRects, arr => arr.slice(0, 2)),
      ).toIncludeAllMembers([rect1, rect2])
      expect(overlapRects.map(arr => arr[2])).toEqual([
        new SimpleRect(point1, point3),
      ])
    })
  })
})
