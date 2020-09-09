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
  const resultCache = new Map<string, R | Error>()
  //参数 => 次数的映射
  const paramCache = new Map<string, number>()
  //当前是否被锁定
  let lock = false
  return async function(...args: P) {
    const key = JSON.stringify(args)
    paramCache.set(key, (paramCache.get(key) || 0) + 1)
    await Promise.all([wait(() => resultCache.has(key) || !lock), wait(ms)])
    if (!resultCache.has(key)) {
      try {
        lock = true
        Array.from(
          await handle(Array.from(paramCache.keys()).map(v => JSON.parse(v))),
        ).forEach(([k, v]) => {
          resultCache.set(JSON.stringify(k), v)
        })
      } finally {
        lock = false
      }
    }
    const value = resultCache.get(key)!
    paramCache.set(key, paramCache.get(key)! - 1)
    if ((paramCache.get(key) || 0) <= 0) {
      paramCache.delete(key)
      resultCache.delete(key)
    }
    if (value instanceof Error) {
      resultCache.delete(key)
      throw value
    }
    return value as R
  }
}
