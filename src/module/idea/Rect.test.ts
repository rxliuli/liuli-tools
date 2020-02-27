import { Rect, RectUtil, SimpleRect } from './Rect'
import { flatMap } from '../array/flatMap'
import { uniqueBy } from '../array/uniqueBy'

describe('测试 Rect', () => {
  const point1 = {
    x: 1,
    y: 1,
  }
  const point2 = {
    x: 2,
    y: 2,
  }
  const point3 = {
    x: 3,
    y: 3,
  }
  const point4 = {
    x: 4,
    y: 4,
  }

  describe('测试是否相交', () => {
    it('基本示例', () => {
      expect(
        new SimpleRect(point1, point4).isIntersectsOrOverlap(
          new SimpleRect(point2, point3),
        ),
      ).toBe(true)
      expect(
        new SimpleRect(point1, point3).isIntersectsOrOverlap(
          new SimpleRect(point2, point4),
        ),
      ).toBe(true)
      expect(
        new SimpleRect(point1, point2).isIntersectsOrOverlap(
          new SimpleRect(point3, point4),
        ),
      ).toBe(false)
    })
  })
  describe('测试相交矩形', () => {
    it('基本示例', () => {
      expect(
        new SimpleRect(point1, point3).intersectsOrOverlap(
          new SimpleRect(point2, point4),
        ),
      ).toEqual(new SimpleRect(point3, point2))
      expect(
        new SimpleRect(point1, point4).intersectsOrOverlap(
          new SimpleRect(point2, point3),
        ),
      ).toEqual(new SimpleRect(point2, point3))
      expect(() =>
        new SimpleRect(point1, point2).intersectsOrOverlap(
          new SimpleRect(point3, point4),
        ),
      ).toThrowError()
    })
  })
  describe('测试是否包含', () => {
    it('测试是否包含矩形', () => {
      expect(
        new SimpleRect(point1, point4).isContains(
          new SimpleRect(point2, point3),
        ),
      ).toBe(true)
      expect(
        new SimpleRect(point1, point3).isContains(
          new SimpleRect(point2, point4),
        ),
      ).toBe(false)
    })
    it('测试是否包含点', () => {
      expect(new SimpleRect(point1, point3).isContains(point2)).toBe(true)
      expect(new SimpleRect(point1, point3).isContains(point3)).toBe(false)
      expect(new SimpleRect(point1, point3).isContains(point4)).toBe(false)
    })
  })
  describe('测试 RectUtil', () => {
    it('基本示例', () => {
      expect(
        RectUtil.isIntersectsOrOverlap([
          new SimpleRect(point1, point3),
          new SimpleRect(point2, point4),
        ]),
      ).toBe(true)
      expect(
        RectUtil.isIntersectsOrOverlap([
          new SimpleRect(point1, point2),
          new SimpleRect(point3, point4),
        ]),
      ).toBe(false)
    })
    it('测试计算相交矩形', () => {
      const rect1 = new SimpleRect(point1, point3)
      const rect2 = new SimpleRect(point1, point2)
      const rect3 = new SimpleRect(point2, point3)
      const rect4 = new SimpleRect(point3, point4)
      const intersectsRects = RectUtil.intersectsOrOverlap([
        rect1,
        rect2,
        rect3,
        rect4,
      ])
      expect(uniqueBy(flatMap(intersectsRects, arr => arr))).toEqual([
        rect1,
        rect2,
        rect3,
      ])
      type CheckIntersectsRect = {
        r1: Rect
        r2: Rect
        intersect: Rect
        type: 'intersect' | 'overlap'
      }

      const Iou = 0.5

      /**
       * 过滤出所有非法的矩形以及相交区域
       */
      function filterIllegal(
        intersectsRects: [Rect, Rect][],
      ): CheckIntersectsRect[] {
        return intersectsRects
          .map(([r1, r2]) => {
            return {
              r1,
              r2,
              intersect: r1.intersectsOrOverlap(r2),
              type:
                r1.isContains(r2) || r2.isContains(r1)
                  ? 'overlap'
                  : 'intersect',
            } as const
          })
          .filter(
            ({ type, intersect, r1, r2 }) =>
              type === 'overlap' ||
              intersect.area() / (r1.area() + r2.area() - intersect.area()) >
                Iou,
          )
      }

      expect(filterIllegal(intersectsRects)).toEqual([
        {
          r1: rect1,
          r2: rect2,
          intersect: rect2,
          type: 'overlap',
        },
        {
          r1: rect1,
          r2: rect3,
          intersect: rect3,
          type: 'overlap',
        },
      ] as CheckIntersectsRect[])
    })
  })
})
