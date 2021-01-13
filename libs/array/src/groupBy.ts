/**
 * 将数组按照指定条件分组
 * @param arr 数组
 * @param kFn 元素分组的唯一标识函数，会将返回 key 作为键，将相同 key 的元素归类为一个数组作为值
 * 注：这里不再包含 reduce 的功能，仅实现分组功能
 */
export function groupBy<T, K>(
  arr: T[],
  kFn: (item: T, index: number, arr: T[]) => K,
): Map<K, T[]> {
  // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
  return arr.reduce((res, item, index, arr) => {
    const k = kFn(item, index, arr)
    const curr = res.get(k) || []
    curr.push(item)
    res.set(k, curr)
    return res
  }, new Map<K, T[]>())
}
