/**
 * 生成一个随机的数字
 * 如果没有参数，则会抛出异常
 * @param num1 第一个参数，如果只有一个参数，则认为是最大值，最小值为 0
 * @param num2 第二个参数，如果该参数存在，则认为第二个是最大值，忽略剩余的参数
 * @returns 生成的随机整数
 */
export function randomInt(num1: number, num2?: number): number {
  const min = num2 ? num1 : 0
  const max = num2 ? num2 : num1
  return min + Math.floor(Math.random() * (max - min))
}
