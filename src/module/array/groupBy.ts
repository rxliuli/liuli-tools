import { ArrayCallback } from '../interface/ArrayCallback'
import { convert } from '../interface/convert'

/**
 * js 数组按照某个条件进行分组
 *
 * @param arr 要进行分组的数组
 * @param kFn 元素分组的唯一标识函数
 * @param vFn 元素分组的值处理的函数。第一个参数是累计值，第二个参数是当前正在迭代的元素，如果你使用过 {@link Array#reduce} 函数的话应该对此很熟悉
 * @param init 每个分组的产生初始值的函数。类似于 reduce 的初始值，但它是一个函数，避免初始值在所有分组中进行累加。
 * @returns 元素标识 => 数组映射 Map
 * @typeparam T 数组元素的类型
 * @typeparam K 分组依据的 Key 的类型，也是结果 Map 的 K
 * @typeparam R 如果未指定 init 参数，则 Map 的值必然是一个数组，至于数组的类型则是任意的，由函数参数 vFn 决定
 * @typeparam V 如果指定了 init 参数，则 Map 的值类型即为 init 函数参数的返回值类型，例如可以使用 init 返回一个 Map 以实现多级级联 Map
 */
export function groupBy<T, K>(arr: T[], kFn: ArrayCallback<T, K>): Map<K, T[]>
export function groupBy<T, K, R>(
  arr: T[],
  kFn: ArrayCallback<T, K>,
  vFn: (res: R[], item: T, index: number, arr: T[]) => R[],
): Map<K, R[]>
export function groupBy<T, K, V>(
  arr: T[],
  kFn: ArrayCallback<T, K>,
  vFn: (res: V, item: T, index: number, arr: T[]) => V,
  init: () => V,
): Map<K, V>
export function groupBy<T, K, V = T[]>(
  arr: T[],
  kFn: ArrayCallback<T, K>,
  /**
   * 默认的值处理函数
   * @param res 最终 map 集合
   * @param item 当前迭代的元素
   */
  vFn: (res: V, item: T, index: number, arr: T[]) => V = convert(
    (res: T[], item: T) => {
      res.push(item)
      return res
    },
  ),
  init: () => V = convert(() => []),
): Map<K, V> {
  // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
  return arr.reduce((res, item: T, index: number, arr: T[]) => {
    const k = kFn(item, index, arr)
    // 如果已经有这个键了就直接追加, 否则先将之初始化再追加元素
    if (!res.has(k)) {
      res.set(k, init())
    }
    res.set(k, vFn(res.get(k)!, item, index, arr))
    return res
  }, new Map<K, V>())
}
