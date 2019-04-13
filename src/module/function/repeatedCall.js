// @ts-check
import { range } from '../array/range'

/**
 * 重复执行指定的函数
 * @param {*} num 重复的次数
 * @param {*} fn 执行的函数，必须是同步函数，否则返回 Array.<Promise>
 * @param  {...any} args 参数
 */
export const repeatedCall = (num, fn, ...args) => {
  return range(0, num).map(() => fn(...args))
}
