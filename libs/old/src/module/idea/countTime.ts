/**
 * 统计函数的执行时间
 * @param fn
 */
export function countTime(fn: () => void): number
export function countTime(fn: () => Promise<void>): Promise<number>
export function countTime<T extends () => Promise<void> | void>(fn: T) {
  const start = Date.now()
  const res = fn()
  if (res instanceof Promise) {
    return res.then(() => Date.now() - start)
  }
  return Date.now() - start
}
