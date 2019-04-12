// @ts-check
import { returnItself } from '../function/returnItself'

/**
 * 数组之间的差异结果类
 * @class ArrayDiff
 */
export class ArrayDiff {
  /**
   * 构造函数
   * @param {Array} left 第一个数组独有的元素列表
   * @param {Array} right 第二个数组独有的元素列表
   * @param {Array} common 两个数组共有的元素列表
   */
  constructor (left, right, common) {
    /**
     * @field 第一个数组独有的元素列表
     */
    this.left = left
    /**
     * @field 第二个数组独有的元素列表
     */
    this.right = right
    /**
     * @field 两个数组共有的元素列表
     */
    this.common = common
  }
}

/**
 * 比较两个数组的差异
 * @param {Array} thanArr 第一个数组
 * @param {Array} thatArr 第二个数组
 * @param {Function} [kFn=returnItself] 每个元素的唯一键函数
 * @returns {ArrayDiff} 比较的差异结果
 */
export function arrayDiffBy (thanArr, thatArr, kFn = returnItself) {
  // @ts-ignore
  const kThanSet = new Set(thanArr.map(kFn))
  // @ts-ignore
  const kThatSet = new Set(thatArr.map(kFn))
  const left = thanArr.filter(v => !kThatSet.has(kFn(v)))
  const right = thatArr.filter(v => !kThanSet.has(kFn(v)))
  // @ts-ignore
  const kLeftSet = new Set(left.map(kFn))
  const common = thanArr.filter(v => !kLeftSet.has(kFn(v)))
  return new ArrayDiff(left, right, common)
}
