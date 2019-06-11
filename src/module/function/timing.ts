import { ReturnFunc } from '../interface/ReturnFunc'
import { compatibleAsync } from '../async/compatibleAsync'

/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param fn 需要测试的函数
 * @returns 执行的毫秒数
 */
export function timing<R>(
  fn: ReturnFunc<R>,
  // 函数返回类型是 Promise 的话，则返回 Promise<number>，否则返回 number
): R extends Promise<any> ? Promise<number> : number {
  const begin = performance.now()
  const res = fn()
  return compatibleAsync(res, () => performance.now() - begin)
}
