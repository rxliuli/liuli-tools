/**
 * 创建一个等差数列数组
 * @param start 开始（包含）
 * @param end 结束（不包含）
 * @param sep 步长，默认为 1
 * @returns 等差数列数组
 */
export function range(start: number, end: number, sep = 1): number[] {
  const arr = []
  for (let i = start; i < end; i += sep) {
    arr.push(i)
  }
  return arr
}
