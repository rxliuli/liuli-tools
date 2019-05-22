/**
 * 判断数字是否在指定区间之中
 * @param num 指定数字
 * @param min 最小值
 * @param max 最大值（不包含）
 */
export function isRange(num: number, min: number, max: number): boolean {
  return num >= min && num < max
}
