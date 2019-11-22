import { returnItself } from '../function/returnItself'
import { doc } from 'prettier'
import Line = doc.builders.Line

export type Comparable = number | string | Date
export type NoComparable = Exclude<any, Comparable>

/**
 * 比较两个区间的位置的结果
 * 有前后两个区间 `[a,b], [c,d], a<b, c<d`
 */
enum LineRangeCompare {
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
  private _compare?: (t: T) => number
  private constructor(public readonly start: T, public readonly end: T) {}

  public static create<T extends Comparable>(start: T, end: T): LineRange<T>
  public static create<T extends NoComparable>(
    start: T,
    end: T,
    kFn: (t: T) => number,
  ): LineRange<T>
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
   * 比较两个区间的位置
   * @param that
   */
  compare(that: LineRange<T>): LineRangeCompare {
    const get = (lineRange: LineRange<T>, field: 'start' | 'end') =>
      lineRange._compare === undefined
        ? lineRange[field]
        : lineRange._compare(lineRange[field])
    const thisStart = get(this, 'start')
    const thisEnd = get(this, 'end')
    const thatStart = get(that, 'start')
    const thatEnd = get(that, 'end')
    if (thisStart < thatStart) {
      if (thisEnd < thatStart) {
        return LineRangeCompare.This_NotOverlap_That
      }
      if (thisEnd > thatStart && thisEnd < thatEnd) {
        return LineRangeCompare.This_Overlap_That
      }
      if (thisEnd === thatEnd) {
        return LineRangeCompare.This_JustIncluded_That
      }
      if (thisEnd > thatEnd) {
        return LineRangeCompare.This_Included_That
      }
    } else if (thisStart === thatStart) {
      if (thisEnd < thatEnd) {
        return LineRangeCompare.StartEqual_That_JustIncluded_This
      }
      if (thisEnd === thatEnd) {
        return LineRangeCompare.This_Equal_That
      }
      if (thisEnd > thatEnd) {
        return LineRangeCompare.StartEqual_This_JustIncluded_That
      }
    } else {
      if (thisEnd < thatEnd) {
        return LineRangeCompare.That_Included_This
      }
      if (thisEnd === thatEnd) {
        return LineRangeCompare.That_JustIncluded_This
      }
      if (thisStart < thatEnd && thisEnd > thatEnd) {
        return LineRangeCompare.That_Overlap_This
      }
      if (thisStart > thatEnd) {
        return LineRangeCompare.That_NotOverlap_This
      }
    }
    throw new Error('区间比较未知情况')
  }
  overlap(that: LineRange<T>): LineRange<T> {
    const res = this.compare(that)
    if (
      new Set([
        LineRangeCompare.This_NotOverlap_That,
        LineRangeCompare.That_NotOverlap_This,
      ]).has(res)
    ) {
      throw new Error('两个区间并不重叠')
    }
    if (
      new Set([
        LineRangeCompare.This_NotOverlap_That,
        LineRangeCompare.That_NotOverlap_This,
      ]).has(res)
    ) {
    }

    return null as any
  }
}

/**
 * 线段区间工具类
 */
export class LineRangeUtil {
  /**
   * 判断一组集合中是否有重叠
   * @param rangeList
   * @param kFn
   * @returns {boolean}
   */
  static isOverlapping<T>(rangeList: LineRange<T>[], kFn: (t: T) => number) {
    if (rangeList.length <= 1) {
      return false
    }
    const sortList = rangeList.sort((a, b) => kFn(a.start) - kFn(b.start))
    for (let i = 0, len = sortList.length; i < len - 1; i++) {
      //如果有重叠就返回 true
      if (kFn(sortList[i].end) > kFn(sortList[i + 1].start)) {
        return true
      }
    }
    return false
  }
}
