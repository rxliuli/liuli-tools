import { ArrayKFn } from '../interface/ArrayKFn'
import { returnItself } from '../function/returnItself'
import { getKFn } from './getKFn'

export function toObject<T, K extends PropertyKey>(
  arr: T[],
  kFn: ArrayKFn<T, K>,
): Record<K, T>
export function toObject<T, K extends PropertyKey, V>(
  arr: T[],
  kFn: ArrayKFn<T, K>,
  vFn: ArrayKFn<T, V>,
): Record<K, V>
/**
 * 将数组转化为一个 Object 对象
 * @deprecated 已废弃，请使用更好的 {@link arrayToMap} 替代
 * @param arr 需要进行转换的数组
 * @param k 生成对象属性名的函数
 * @param v 生成对象属性值的函数，默认为数组中的迭代元素
 * @returns 转化得到的对象
 */
export function toObject<T, K extends PropertyKey, V>(
  arr: T[],
  k: ArrayKFn<T, K>,
  v: ArrayKFn<T, V> = returnItself,
): Record<PropertyKey, V> {
  const kFn = getKFn(k)
  const vFn = getKFn(v)
  return arr.reduce((res: Record<PropertyKey, V>, item, i, arr) => {
    const k = kFn(item, i, arr)
    if (!Reflect.has(res, k)) {
      Reflect.set(res, k, vFn(item, i, arr))
    }
    return res
  }, {})
}
