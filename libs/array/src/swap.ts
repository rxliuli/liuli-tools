/**
 * 交换数组两个位置的值
 * @param arr 数组
 * @param i 第一个下标
 * @param k 第二个下标
 * @returns 交换后的数组
 */
export function swap<T>(arr: T[], i: number, k: number): T[] {
  const res = arr.slice()
  ;[res[i], res[k]] = [res[k], res[i]]
  return res
}
