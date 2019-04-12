// @ts-check
import { returnItself } from './../function/returnItself'

/**
 * 从数组中移除指定的元素
 * 注: 时间复杂度为 1~3On
 * @param {Array} arr 需要被过滤的数组
 * @param {Array} deleteItems 要过滤的元素数组
 * @param {Function} [kFn=returnItself] 每个元素的唯一键函数
 */
export function filterItems (arr, deleteItems, kFn = returnItself) {
  // @ts-ignore
  const kSet = new Set(deleteItems.map(kFn))
  return arr.filter(v => !kSet.has(kFn(v)))
}
