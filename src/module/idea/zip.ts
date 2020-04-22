/**
 * 压缩两个数组为一个数组
 * @param arr1
 * @param arr2
 * @param [operation]
 */
export function zip<T, R>(
  arr1: T[],
  arr2: T[],
  operation: (v1: T, v2: T, index: number) => R = (x, y) => [x, y] as any,
): R[] {
  const arr = []
  for (let i = 0, len = Math.min(arr1.length, arr2.length); i < len; i++) {
    const v1 = arr1[i]
    const v2 = arr2[i]
    const v = operation(v1, v2, i)
    arr.push(v)
  }
  return arr
}
