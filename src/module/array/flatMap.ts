import { ArrayCallback } from '../interface/ArrayCallback'
import { convert } from '../interface/convert'

/**
 * 自行实现 flatMap，将数组压平一层
 * @param arr 数组
 * @param fn 映射方法，将一个元素映射为一个数组
 * @returns 压平一层的数组
 */
export function flatMap<T, V>(
  arr: T[],
  fn: ArrayCallback<T, V[]> = v => Array.from(convert(v)),
): V[] {
  return arr.reduce((res, v, i, arr) => {
    res.push(...fn(v, i, arr))
    return res
  }, new Array<V>())
}
