/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param fn 异步函数
 * @param limit 并发限制数量
 * @returns 返回被包装后的限制并发功能的函数
 */
export function asyncLimiting<T extends (...args: any[]) => Promise<any>>(fn: T, limit: number): T {
  let execCount = 0
  const tasks: (() => void)[] = []
  return async function (...args: any[]) {
    await new Promise<void>((resolve) => {
      if (execCount < limit) {
        resolve()
        execCount++
      } else {
        tasks.push(resolve)
      }
    })
    try {
      return await fn(...args)
    } finally {
      execCount--
      if (execCount < limit && tasks.length !== 0) {
        tasks.shift()!()
        execCount++
      }
    }
  } as T
}
