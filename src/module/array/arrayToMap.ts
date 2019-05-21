import { returnItself } from '../function/returnItself'
import { convert } from '../interface/convert'
import { ArrayCallback } from '../interface/ArrayCallback'

/**
 * 将数组映射为 Map
 * @param arr 数组
 * @param kFn 产生 Map 元素唯一标识的函数
 * @param [vFn] 产生 Map 值的函数，默认为返回数组的元素
 * @returns 映射产生的 map 集合
 */
export function arrayToMap<T, K, V>(
  arr: T[],
  kFn: ArrayCallback<T, K>,
  vFn: ArrayCallback<T, V> = convert(returnItself),
): Map<K, V> {
  return arr.reduce(
    (res, item, index, arr) =>
      res.set(kFn(item, index, arr), vFn(item, index, arr)),
    new Map<K, V>(),
  )
}
