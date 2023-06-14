/**
 * js 的数组去重方法
 * @param arr 要进行去重的数组
 * @param kFn 唯一标识元素的方法，默认返回自身
 * @returns 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
export function uniqueBy<T, K>(arr: T[], kFn: (item: T, index: number, arr: T[]) => K = (v) => v as any): T[] {
  const set = new Set<K>()
  return arr.filter((v, ...args) => {
    const k = kFn(v, ...args)
    if (set.has(k)) {
      return false
    }
    set.add(k)
    return true
  })
}
