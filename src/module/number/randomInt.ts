/**
 * 生成一个随机的数字
 * 如果没有参数，则会抛出异常
 * @param args 参数列表，如果只有一个参数，则认为是最大值，最小值为 0。否则认为第一个是最小值，第二个是最大值，忽略剩余的参数
 * @returns 生成的随机整数
 */
export function randomInt(num1: number, num2?: number): number {
  const min = num2 ? num1 : 0
  const max = num2 ? num2 : num1
  return min + Math.floor(Math.random() * (max - min))
}
