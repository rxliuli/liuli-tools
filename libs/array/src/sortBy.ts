type CompareType = number | string | BigInt

export function sortBy<T extends CompareType>(
  i: T[],
  kFn?: (item: T) => CompareType,
): T[]
export function sortBy<T extends Exclude<any, CompareType>>(
  i: T[],
  kFn: (item: T) => CompareType,
): T[]
/**
 * 对数组进行排序
 * @param arr 需要排序的数组
 * @param kFn 比较函数，默认是原值
 */
export function sortBy<T>(
  arr: T[],
  kFn: (item: T) => CompareType = (v) => (v as unknown) as CompareType,
): T[] {
  return [...arr].sort((a, b) => {
    const ak = kFn(a)
    const bk = kFn(b)
    if (ak === bk) {
      return 0
    }
    if (ak > bk) {
      return 1
    }
    return -1
  })
}
