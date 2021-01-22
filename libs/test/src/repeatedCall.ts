import { PromiseType } from 'utility-types'

/**
 * 重复执行指定的函数
 * @param num 重复的次数
 * @param fn 执行的函数，如果是异步函数，则返回 Array.<Promise>
 * @returns 执行返回结果
 */
export function repeatedCall<T extends (i: number) => Promise<any>>(
  fn: T,
  num: number,
): Promise<PromiseType<ReturnType<T>>[]>
export function repeatedCall<T extends (i: number) => any>(
  fn: T,
  num: number,
): ReturnType<T>[]
export function repeatedCall<T extends (i: number) => any>(
  fn: T,
  num: number,
): any {
  const res = Array(num)
    .fill(0)
    .map((_, i) => fn(i))
  if (num > 0 && res[0] instanceof Promise) {
    return Promise.all(res)
  }
  return res
}
