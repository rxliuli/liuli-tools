import { wait } from './wait'

/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param fn 异步函数
 * @param limit 并发限制数量
 * @returns 返回被包装后的限制并发功能的函数
 */
export function asyncLimiting<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limit: number,
): T {
  let execCount = 0
  return async function (...args: any[]) {
    await wait(() => {
      const res = execCount < limit
      // 如果等待结束则必须立刻增加 execCount，避免微任务与宏任务调度可能产生错误
      if (res) {
        execCount++
      }
      return res
    })
    try {
      return await fn(...args)
    } finally {
      execCount--
    }
  } as T
}
