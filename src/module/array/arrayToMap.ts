/**
 * 将数组映射为 Map
 * @param {Array.<Object>} arr 数组
 * @param {function} kFn 产生 Map 元素唯一标识的函数
 * @param {Function} [vFn] 产生 Map 值的函数，默认为返回数组的元素
 * @returns {Map.<Object,Object>} 映射产生的 map 集合
 */
export function arrayToMap<T, K, V>(
  arr: T[],
  kFn: (item: T, ...args: any[]) => K,
  vFn: (item: T, ...args: any[]) => any = v => v,
): Map<K, V> {
  return arr.reduce(
    (res, item, ...args) => res.set(kFn(item, ...args), vFn(item, ...args)),
    new Map(),
  )
}
