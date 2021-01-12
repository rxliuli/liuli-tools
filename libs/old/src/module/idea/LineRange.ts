export type Comparable = number | string | Date
export type NoComparable = Exclude<any, Comparable>

export class LineRange<T> {
  private _compare?: (t: T) => number
  private constructor(public readonly start: T, public readonly end: T) {}

  /**
   * 创建一个区间
   * 注意，默认是 [闭-开) 区间
   * https://baike.baidu.com/item/%E5%8D%8A%E5%BC%80%E5%8D%8A%E9%97%AD%E5%8C%BA%E9%97%B4#1
   * @param start
   * @param end
   * @param kFn
   */
  static create<T>(start: T, end: T, kFn?: (t: T) => number): LineRange<T> {
    if (kFn === undefined) {
      if (start > end) {
        ;[start, end] = [end, start]
      }
      return new LineRange(start, end)
    }
    if (kFn(start) > kFn(end)) {
      ;[start, end] = [end, start]
    }
    const lineRange = new LineRange(start, end)
    lineRange._compare = kFn
    return lineRange
  }

  /**
   * 获取某个字段的可比较值
   * @param field 字段名，目前只允许 start|end
   * @returns 一个可比较的值，要么是 {@type Comparable}, 要么是经过 {@property _compare} 转换后的 {@type number}
   */
  get(field: 'start' | 'end') {
    return this._compare === undefined
      ? this[field]
      : this._compare(this[field])
  }
  /**
   * 判断两者是否重叠
   * @param that 另一个区间对象
   * @returns 是否有重叠
   */
  isOverlap(that: LineRange<T>): boolean {
    const k = this.get('start')
    const l = this.get('end')
    const m = that.get('start')
    const n = that.get('end')
    return !(l <= m || k >= n)
  }
  /**
   * 获取两个区间的重叠位置
   * @param that
   * @returns 如果不重叠则抛出异常
   */
  overlap(that: LineRange<T>): LineRange<T> {
    //如果两者不重叠，则抛出异常
    if (!this.isOverlap(that)) {
      throw new Error('两个区间不重叠')
    }
    const [min, max] =
      this.get('start') < that.get('start') ? [this, that] : [that, this]
    const end = min.get('end') < max.get('end') ? min.end : max.end
    return new LineRange(max.start, end)
  }
}
