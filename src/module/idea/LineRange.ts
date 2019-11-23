export type Comparable = number | string | Date
export type NoComparable = Exclude<any, Comparable>

/**
 * 比较两个区间的位置的结果
 * 有前后两个区间 `[a,b], [c,d], a<b, c<d`
 */
export enum LineRangeCompareEnum {
  //region `a < c`

  // 1. 前 不重叠 后: `b < c`
  This_NotOverlap_That,
  // 2. 前 重叠 后: `c < b < d`
  This_Overlap_That,
  // 3. 前 刚好包含 后: `b = d`
  This_JustIncluded_That,
  // 4. 前 包含 后: `b > d`

  //endregion

  //region `a = c`

  This_Included_That,
  // 1. `b < d`: 后 刚好包含 前
  StartEqual_That_JustIncluded_This,
  // 2. `b = d`: 前 等于 后
  This_Equal_That,
  // 3. `b > d`: 前 刚好包含 后
  StartEqual_This_JustIncluded_That,

  //endregion

  //region `a > c`

  // 1. 后 包含 前: `b < d`
  That_NotOverlap_This,
  // 2. 后 刚好包含 前: `b = d`
  That_Overlap_This,
  // 3. 后 重叠 前: `a < d && b > d`
  That_JustIncluded_This,
  // 4. 后 不重叠 前 `a > d`
  That_Included_This,

  //endregion
}

export class LineRange<T> {
  static CompareEnum = LineRangeCompareEnum

  private _compare?: (t: T) => number
  private constructor(public readonly start: T, public readonly end: T) {}

  /**
   * 创建一个区间
   * 注意，默认是 [闭-开) 区间
   * @param start
   * @param end
   * @param kFn
   */
  public static create<T>(
    start: T,
    end: T,
    kFn?: (t: T) => number,
  ): LineRange<T> {
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
  public get(field: 'start' | 'end') {
    return this._compare === undefined
      ? this[field]
      : this._compare(this[field])
  }
  /**
   * 比较两个区间的位置
   * @param that 另一个区间对象
   * @returns 比较的结果
   */
  compare(that: LineRange<T>): LineRangeCompareEnum {
    const thisStart = this.get('start')
    const thisEnd = this.get('end')
    const thatStart = that.get('start')
    const thatEnd = that.get('end')
    if (thisStart < thatStart) {
      if (thisEnd <= thatStart) {
        return LineRangeCompareEnum.This_NotOverlap_That
      }
      if (thisEnd > thatStart && thisEnd < thatEnd) {
        return LineRangeCompareEnum.This_Overlap_That
      }
      if (thisEnd === thatEnd) {
        return LineRangeCompareEnum.This_JustIncluded_That
      }
      if (thisEnd > thatEnd) {
        return LineRangeCompareEnum.This_Included_That
      }
    } else if (thisStart === thatStart) {
      if (thisEnd < thatEnd) {
        return LineRangeCompareEnum.StartEqual_That_JustIncluded_This
      }
      if (thisEnd === thatEnd) {
        return LineRangeCompareEnum.This_Equal_That
      }
      if (thisEnd > thatEnd) {
        return LineRangeCompareEnum.StartEqual_This_JustIncluded_That
      }
    } else {
      if (thisEnd < thatEnd) {
        return LineRangeCompareEnum.That_Included_This
      }
      if (thisEnd === thatEnd) {
        return LineRangeCompareEnum.That_JustIncluded_This
      }
      if (thisStart < thatEnd && thisEnd > thatEnd) {
        return LineRangeCompareEnum.That_Overlap_This
      }
      if (thisStart >= thatEnd) {
        return LineRangeCompareEnum.That_NotOverlap_This
      }
    }
    throw new Error('区间比较未知情况')
  }

  /**
   * 判断两者是否重叠
   * @param that 另一个区间对象
   * @returns 是否有重叠
   */
  isOverlap(that: LineRange<T>): boolean {
    return !new Set([
      LineRangeCompareEnum.This_NotOverlap_That,
      LineRangeCompareEnum.That_NotOverlap_This,
    ]).has(this.compare(that))
  }
  /**
   * 获取两个区间的重叠位置
   * @param that
   * @returns 如果不重叠则抛出异常
   */
  overlap(that: LineRange<T>): LineRange<T> {
    const [min, max]: [LineRange<T>, LineRange<T>] =
      this.get('start') < that.get('start') ? [this, that] : [that, this]
    //如果两者不重叠，则返回 null
    if (!this.isOverlap(that)) {
      throw new Error('两个区间不重叠')
    }
    const end = min.get('end') < max.get('end') ? min.end : max.end
    return new LineRange(max.start, end)
  }
}
