import { wait } from '../function/wait'

interface IAsyncLimiting {
  limit: number
}

/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param fn 异步函数
 * @param [options={}] 可选参数
 * @param [options.limit=1] 并发限制数量，默认为 1
 * @returns 返回被包装后的限制并发功能的函数
 */
export function asyncLimiting<R>(
  fn: (...args: any[]) => R,
  { limit = 1 }: Partial<IAsyncLimiting> = {},
): (...args: any[]) => R {
  // 当前正在执行异步的数量
  let execCount = 0
  // waitArr 等待的队列
  const takeQueue: any[][] = []
  // 是否增加了 execCount 的标记
  let flag = false
  return new Proxy(fn, {
    async apply(target, thisArg, args) {
      const _takeRun = async () => {
        if (!flag) {
          execCount++
          flag = false
        }
        const tempArgs = takeQueue.shift()
        try {
          return await Reflect.apply(target, thisArg, tempArgs!)
        } finally {
          execCount--
        }
      }
      takeQueue.push(args)

      await wait(() => {
        const result = execCount < limit
        if (result) {
          flag = true
          execCount++
        }
        return result
      })
      return _takeRun()
    },
  })
}
