export function arrayToMap<T, K>(arr: T[], kFn: (item: T, index: number, arr: T[]) => K): Map<K, T>
export function arrayToMap<T, K, V>(
  arr: T[],
  kFn: (item: T, index: number, arr: T[]) => K,
  vFn: (item: T, index: number, arr: T[]) => V,
): Map<K, V>
/**
 * 将数组映射为 Map
 * @param arr 数组
 * @param kFn 产生 Map 元素唯一标识的函数
 * @param vFn 产生 Map 值的函数，默认为返回数组的元素
 * @returns 映射产生的 map 集合
 */
export function arrayToMap<T, K, V>(
  arr: T[],
  kFn: (item: T, index: number, arr: T[]) => K,
  vFn: (item: T, index: number, arr: T[]) => V = (v) => v as any,
): Map<K, V> {
  return arr.reduce((res, item, index, arr) => res.set(kFn(item, index, arr), vFn(item, index, arr)), new Map<K, V>())
}
