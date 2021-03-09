type CompareType = number | string | BigInt

export function sortBy<T extends CompareType>(
  i: T[],
  kFn?: (item: T, index: number, arr: T[]) => CompareType,
): T[]
export function sortBy<T extends Exclude<any, CompareType>>(
  i: T[],
  kFn: (item: T, index: number, arr: T[]) => CompareType,
): T[]
/**
 * 对数组进行排序
 * @param arr 需要排序的数组
 * @param kFn 比较函数，默认是原值
 */
export function sortBy<T>(
  arr: T[],
  kFn: (item: T, index: number, arr: T[]) => CompareType = (v) =>
    (v as unknown) as CompareType,
): T[] {
  // 边界条件，如果传入数组的值
  if (arr.length <= 1) {
    return arr
  }
  // 根据中间值对数组分治为两个数组
  const medianIndex = Math.floor(arr.length / 2)
  const medianValue = arr[medianIndex]
  const left = []
  const right = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (i === medianIndex) {
      continue
    }
    const v = arr[i]
    if (kFn(v, i, arr) <= kFn(medianValue, i, arr)) {
      left.push(v)
    } else {
      right.push(v)
    }
  }
  return sortBy(left, kFn).concat([medianValue]).concat(sortBy(right, kFn))
}
