import { range } from '../array/range'

/**
 * 重复执行指定的函数
 * @param {Number} num 重复的次数
 * @param {Function} fn 执行的函数，如果是异步函数，则返回 Array.<Promise>
 * @param  {...Object} args 参数
 * @returns {Array} 执行返回结果
 */
export function repeatedCall<R>(
  num: number,
  fn: (...args: any[]) => R,
  ...args: any[]
): R[] {
  return range(0, num).map(() => fn(...args))
}
