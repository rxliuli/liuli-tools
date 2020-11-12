type PromiseD<T extends Promise<any>> = T extends Promise<infer R> ? R : never

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会阻止的异步操作，非常类似于 asyncLimiting(1)，但不同之处在于它会直接抛弃掉并发的请求
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function exhaustMap<Fn extends (...args: any[]) => Promise<any>>(
  fn: Fn,
): (...args: Parameters<Fn>) => Promise<PromiseD<ReturnType<Fn>> | void> {
  let lock = false
  return new Proxy(fn, {
    async apply(target: Fn, thisArg: any, argArray?: any) {
      if (lock) {
        return
      }
      lock = true
      try {
        return await Reflect.apply(target, thisArg, argArray)
      } finally {
        lock = false
      }
    },
  })
}
