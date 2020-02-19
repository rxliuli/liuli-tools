export enum PointCompareEnum {
  LeftTop,
  Left,
  LeftBottom,
  Bottom,
  RightBottom,
  Right,
  RightTop,
  Top,
  Equal,
}

/**
 * 点的接口
 */
export interface Point {
  readonly x: number
  readonly y: number
}

/**
 * 矩形接口
 */
export interface Rect {
  /**
   * 左下角的起始坐标
   */
  readonly start: Point
  /**
   * 右上角的终点坐标
   */
  readonly end: Point

  /**
   * 计算是否有重叠
   * @param that
   */
  isOverlap(that: Rect): boolean

  /**
   * 计算重叠位置，如果没有重叠则返回 null
   * 方案 1
   * 1. 计算大致的【方向】
   * 2. 根据方向决定计算的【公式】
   * 3. 计算两个交点，生成 Rect 对象
   * 方案 2
   * 1. 计算相近四条边的交点
   * 2. 计算相近的四条边的【交集】
   * 3. 判断交集是否在矩形内
   * 4. 根据交点生成 Rect 对象
   * 参考：https://www.zhihu.com/question/28854765
   * @param that
   */
  overlap(that: Rect): Rect
}

/**
 * 基于笛卡尔坐标系的点
 */
class SimplePoint implements Point {
  constructor(public readonly x: number, public readonly y: number) {}
  compare(that: Point) {
    if (this.x < that.x) {
      if (this.y < that.y) {
        return PointCompareEnum.LeftTop
      } else if (this.y === that.y) {
        return PointCompareEnum.Left
      } else {
        return PointCompareEnum.LeftBottom
      }
    } else if (this.x === that.x) {
      if (this.y < that.y) {
        return PointCompareEnum.Top
      } else if (this.y === that.y) {
        return PointCompareEnum.Equal
      } else {
        return PointCompareEnum.Bottom
      }
    } else {
      if (this.y < that.y) {
        return PointCompareEnum.RightTop
      } else if (this.y === that.y) {
        return PointCompareEnum.Right
      } else {
        return PointCompareEnum.RightBottom
      }
    }
  }
}

function swap(a: number, b: number): [number, number] {
  return a < b ? [a, b] : [b, a]
}

/**
 * 简单矩形
 */
export class SimpleRect implements Rect {
  readonly start: Point
  readonly end: Point
  constructor(start: Point, end: Point) {
    const [minX, maxX] = swap(start.x, end.x)
    const [minY, maxY] = swap(start.y, end.y)
    this.start = new SimplePoint(minX, minY)
    this.end = new SimplePoint(maxX, maxY)
  }

  /**
   * 计算矩形是否相交
   * 计算规则参考：
   * - https://stackoverflow.com/questions/23302698/java-check-if-two-rectangles-overlap-at-any-point
   * @param that
   */
  isOverlap(that: SimpleRect) {
    const res =
      // 右侧
      this.start.x >= that.end.x ||
      // 左侧
      this.end.x <= that.start.x ||
      // 上面
      this.start.y >= that.end.y ||
      // 下面
      this.end.y <= that.start.y
    return !res
  }

  /**
   * 计算相交矩形区域
   * 计算规则参考
   * - https://lucumt.info/post/calculate-total-area-of-two-rectangles/
   * @param that
   */
  overlap(that: Rect): Rect {
    if (!this.isOverlap(that)) {
      throw new Error('两个矩形未相交')
    }
    const {
      start: { x: k, y: l },
      end: { x: m, y: n },
    } = this
    const {
      start: { x: p, y: q },
      end: { x: r, y: s },
    } = that
    const leftDownX = k > p ? k : p
    const leftDownY = l > q ? l : q
    const rightUpX = m < r ? m : r
    const rightUpY = n < s ? n : s
    return new SimpleRect(
      {
        x: leftDownX,
        y: leftDownY,
      },
      {
        x: rightUpX,
        y: rightUpY,
      },
    )
  }
}

/**
 * 矩形的工具类
 */
export class RectUtil {
  static isOverlap(rects: Rect[]) {
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i]
      for (let k = i + 1; k < rects.length; k++) {
        let temp = rects[k]
        if (rect.isOverlap(temp)) {
          return true
        }
      }
    }
    return false
  }
  static overlap(rects: Rect[]): [Rect, Rect, Rect][] {
    const overlapRects: [Rect, Rect, Rect][] = []
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i]
      for (let k = i + 1; k < rects.length; k++) {
        let temp = rects[k]
        if (rect.isOverlap(temp)) {
          overlapRects.push([rect, temp, rect.overlap(temp)])
        }
      }
    }
    return overlapRects
  }
}
