/**
 * 生成一个随机的数字
 * @param max 最大值，最小值默认为 0
 * @returns 生成的随机整数
 * @throws 当 max 小于等于 0 时
 */
export function randomInt(max: number): number
/**
 * 生成一个随机的数字
 * @param min 最小值
 * @param max 最大值（不包含）
 * @returns 生成的随机整数
 * @throws 当 max 小于等于 0 时
 */
export function randomInt(min: number, max: number): number
export function randomInt(num1: number, num2?: number): number {
  const min = num2 ? num1 : 0
  const max = num2 ? num2 : num1
  if (max <= 0) {
    throw new Error('最大值不能为 0')
  }
  return min + Math.floor(Math.random() * (max - min))
}
