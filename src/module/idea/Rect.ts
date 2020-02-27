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
   * 计算是否有相交或重叠
   * @param that
   */
  isIntersectsOrOverlap(that: Rect): boolean

  /**
   * 计算相交或重叠区域，如果没有重叠则抛出异常
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
   * @throws
   */
  intersectsOrOverlap(that: Rect): Rect

  /**
   * 是否包含指定的矩形
   * @param that
   */
  isContains(that: Rect): boolean

  /**
   * 判断矩形内是否包含指定点
   * @param point
   */
  isContains(point: Point): boolean

  /**
   * 获取矩形的面积
   */
  area(): number
}

/**
 * -1 指的是相对在负轴方向（左/下）
 * 0 指的是在该轴上相同
 * 1 指的是相对在正轴方向（右/上）
 */
export type SimplePointCompareType = -1 | 0 | 1

/**
 * 基于笛卡尔坐标系的点
 */
export class SimplePoint implements Point {
  constructor(public readonly x: number, public readonly y: number) {}

  /**
   * 计算点的相对位置
   * 是 that 相对于当前矩形的位置
   * @param that
   */
  compare(that: Point): [SimplePointCompareType, SimplePointCompareType] {
    const x = that.x - this.x
    const y = that.y - this.y
    return [SimplePoint.compute(x), SimplePoint.compute(y)]
  }
  private static compute(num: number): SimplePointCompareType {
    return num > 0 ? 1 : num === 0 ? 0 : -1
  }
}

/**
 * 简单矩形
 */
export class SimpleRect implements Rect {
  readonly start: SimplePoint
  readonly end: SimplePoint
  private static swap(a: number, b: number): [number, number] {
    return a < b ? [a, b] : [b, a]
  }
  constructor(start: Point, end: Point) {
    const [minX, maxX] = SimpleRect.swap(start.x, end.x)
    const [minY, maxY] = SimpleRect.swap(start.y, end.y)
    this.start = new SimplePoint(minX, minY)
    this.end = new SimplePoint(maxX, maxY)
  }

  /**
   * 计算规则参考：
   * - https://stackoverflow.com/questions/23302698/java-check-if-two-rectangles-overlap-at-any-point
   * @param that
   */
  isIntersectsOrOverlap(that: Rect) {
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
   * 计算规则参考
   * - https://lucumt.info/post/calculate-total-area-of-two-rectangles/
   * @param that
   */
  intersectsOrOverlap(that: Rect): SimpleRect {
    if (!this.isIntersectsOrOverlap(that)) {
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

  isContains(that: Rect): boolean
  isContains(point: Point): boolean
  isContains(that: Rect | Point): boolean {
    if (that instanceof SimpleRect) {
      return (
        this.start.x <= that.start.x &&
        this.start.y <= that.start.y &&
        this.end.x >= that.end.x &&
        this.end.y >= that.end.y
      )
    } else {
      const {
        start: { x: k, y: l },
        end: { x: m, y: n },
      } = this
      const _ = that as Point
      return _.x > k && _.x < m && _.y > l && _.y < n
    }
  }

  area(): number {
    return (this.end.x - this.start.x) * (this.end.y - this.start.y)
  }
}

/**
 * 矩形的工具类
 */
export class RectUtil {
  static isIntersectsOrOverlap(rects: Rect[]) {
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i]
      for (let k = i + 1; k < rects.length; k++) {
        let temp = rects[k]
        if (rect.isIntersectsOrOverlap(temp)) {
          return true
        }
      }
    }
    return false
  }

  /**
   * 获取相交或重叠的矩形对列表
   * @param rects
   * @returns [相交的矩形1, 相交的矩形 2][]，如果没有任何矩形相交则返回 []
   */
  static intersectsOrOverlap(rects: Rect[]): [Rect, Rect][] {
    const overlapRects: [Rect, Rect][] = []
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i]
      for (let k = i + 1; k < rects.length; k++) {
        let temp = rects[k]
        if (rect.isIntersectsOrOverlap(temp)) {
          overlapRects.push([rect, temp])
        }
      }
    }
    return overlapRects
  }
}
