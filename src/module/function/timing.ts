import { ReturnFunc } from '../interface/ReturnFunc'

/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param fn 需要测试的函数
 * @returns 执行的毫秒数
 */
export function timing<R>(fn: ReturnFunc<Exclude<R, Promise<any>>>): number
export function timing<R>(fn: ReturnFunc<Promise<any>>): Promise<number>
export function timing<R>(fn: ReturnFunc<R>): number | Promise<number> {
  const begin = performance.now()
  const result = fn()
  if (!(result instanceof Promise)) {
    return performance.now() - begin
  }
  return result.then(() => performance.now() - begin)
}
