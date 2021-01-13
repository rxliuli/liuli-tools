/**
 * 将数组按照指定条件分组
 * @param arr 数组
 * @param kFn 元素分组的唯一标识函数，会将返回 key 作为键，将相同 key 的元素归类为一个数组作为值
 * 注：这里不再包含 reduce 的功能，仅实现分组功能
 */
export function groupBy<T, K>(
  arr: T[],
  kFn: (item: T, index: number, arr: T[]) => K,
): Map<K, T[]>
/**
 * 将数组按照指定条件分组
 * @param arr 要进行分组的数组
 * @param kFn 元素分组的唯一标识函数，会将返回 key 作为键，将相同 key 的元素归类为一个数组作为值
 * @param vFn 元素分组的值处理的函数。第一个参数是累计值，第二个参数是当前正在迭代的元素，如果你使用过 {@link Array#reduce} 函数的话应该对此很熟悉
 * @returns 元素标识 => 数组映射 Map
 */
export function groupBy<T, K, R extends any[]>(
  arr: T[],
  kFn: (item: T, index: number, arr: T[]) => K,
  vFn: (res: R, item: T, index: number, arr: T[]) => R,
): Map<K, R>
export function groupBy<T, K, R>(
  arr: T[],
  kFn: (item: T, index: number, arr: T[]) => K,
  vFn: (res: R[], item: T, index: number, arr: T[]) => R[] = (res, item) => {
    res.push(item as any)
    return res
  },
): Map<K, R[]> {
  // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
  return arr.reduce((res, item, index, arr) => {
    const k = kFn(item, index, arr)
    res.set(k, vFn(res.get(k) || [], item, index, arr))
    return res
  }, new Map<K, R[]>())
}
