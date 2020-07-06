import { wait } from '../async/wait'

/**
 * 将多个并发异步调用合并为一次批处理
 * @param handle 批处理的函数
 * @param ms 等待的时长（时间越长则可能合并的调用越多，否则将使用微任务只合并一次同步执行的所有调用）
 */
export function batch<P extends any[], R extends any>(
  handle: (list: P[]) => Promise<Map<P, R | Error>>,
  ms: number = 0,
): (...args: P) => Promise<R> {
  //参数 => 结果 映射
  const cache = new Map<string, R | Error>()
  //参数 => 次数的映射
  const paramSet = new Map<string, number>()
  //当前是否被锁定
  let lock = false
  return async function(...args: P) {
    const key = JSON.stringify(args)
    paramSet.set(key, (paramSet.get(key) || 0) + 1)
    await Promise.all([wait(() => cache.has(key) || !lock), wait(ms)])
    if (!cache.has(key)) {
      try {
        lock = true
        Array.from(
          await handle(Array.from(paramSet.keys()).map(v => JSON.parse(v))),
        ).forEach(([k, v]) => {
          cache.set(JSON.stringify(k), v)
        })
      } finally {
        lock = false
      }
    }
    const value = cache.get(key)
    paramSet.delete(key)
    paramSet.set(key, (paramSet.get(key) || 0) - 1)
    if ((paramSet.get(key) || 0) <= 0) {
      paramSet.delete(key)
    }
    // noinspection SuspiciousTypeOfGuard
    if (value instanceof Error) {
      cache.delete(key)
      throw value
    }
    return value as R
  }
}
