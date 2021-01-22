import { PromiseType } from 'utility-types'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会阻止的异步操作，非常类似于 asyncLimiting(1)，但不同之处在于它会直接抛弃掉并发的请求
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function exhaustMap<T extends (...args: any[]) => Promise<any>>(
  fn: T,
): (...args: Parameters<T>) => Promise<PromiseType<ReturnType<T>> | void> {
  let lock = false
  return async function (...args: any[]) {
    if (lock) {
      return
    }
    lock = true
    try {
      return await fn(...args)
    } finally {
      lock = false
    }
  }
}
