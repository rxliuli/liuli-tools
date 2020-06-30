import { wait } from '../async/wait'

/**
 * 将多个并发异步调用合并为一次批处理
 * @param handle 批处理的函数
 */
export function batch<P extends any[], R extends any>(
  handle: (list: P[]) => Promise<Map<P, R | Error>>,
): (...args: P) => Promise<R> {
  const resultMap = new Map<P, R | Error>()
  const paramSet = new Set<P>()
  let lock = false
  return async function(...argArray: P) {
    paramSet.add(argArray)
    await wait(() => resultMap.has(argArray) || !lock)
    lock = true
    try {
      if (!resultMap.has(argArray)) {
        Array.from(await handle(Array.from(paramSet))).forEach(([k, v]) => {
          resultMap.set(k, v)
        })
      }
      const value = resultMap.get(argArray)
      paramSet.delete(argArray)
      resultMap.delete(argArray)

      // noinspection SuspiciousTypeOfGuard
      if (value instanceof Error) {
        throw value
      }
      return value as R
    } finally {
      lock = false
    }
  }
}
