import { ArrayKFn } from '../interface/ArrayKFn'
import { getKFn } from './getKFn'

/**
 * 自行实现 flatMap，将数组压平一层
 * @param arr 数组
 * @param k 映射方法，将一个元素映射为一个数组
 * @returns 压平一层的数组
 */
export function flatMap<T, V>(
  arr: T[],
  k: ArrayKFn<T, V[]> = (v: T) => Array.from(v as any),
): V[] {
  const fn = getKFn(k)
  return arr.reduce((res, v, i, arr) => {
    res.push(...fn(v, i, arr))
    return res
  }, new Array<V>())
}
