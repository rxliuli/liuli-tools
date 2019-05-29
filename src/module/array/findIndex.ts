import { ArrayCallback } from '../interface/ArrayCallback'

/**
 * 查询符合条件的元素的下标
 * @param arr 查询的数组
 * @param fn 谓词
 * @param num 查询的第几个符合条件的元素，默认为 1，和默认的 findIndex 行为保持一致
 * @returns 符合条件的元素的下标，如果没有则返回 -1
 */
export function findIndex<T>(
  arr: T[],
  fn: ArrayCallback<T, boolean>,
  num = 1,
): number {
  let k = 0
  for (let i = 0, len = arr.length; i < len; i++) {
    if (fn.call(arr, arr[i], i, arr) && ++k >= num) {
      return i
    }
  }
  return -1
}
