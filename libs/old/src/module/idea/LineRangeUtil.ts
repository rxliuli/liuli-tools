import { LineRange } from './LineRange'

/**
 * 线段区间工具类
 */
export class LineRangeUtil {
  /**
   * 判断一组集合中是否有重叠
   * @param rangeList 区间列表
   * @returns {boolean} 是否有重叠
   */
  static isOverlap<T>(rangeList: LineRange<T>[]) {
    if (rangeList.length <= 1) {
      return false
    }
    const sortList = rangeList.sort(
      (a, b) => (a.get('start') as any) - (b.get('start') as any),
    )
    for (let i = 0, len = sortList.length; i < len - 1; i++) {
      //如果有重叠就返回 true
      if (sortList[i].get('end') > sortList[i + 1].get('start')) {
        return true
      }
    }
    return false
  }
}
