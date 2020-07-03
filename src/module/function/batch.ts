import { wait } from '../async/wait'
import {
  BaseMemoryCache,
  MemoryCacheEnum,
  MemoryCacheFactory,
} from '../cache/MemoryCache'

/**
 * 将多个并发异步调用合并为一次批处理
 * @param handle 批处理的函数
 * @param ms 等待的时长（时间越长则可能合并的调用越多，否则将使用微任务只合并一次同步执行的所有调用）
 * @param cache 缓存对象，必须限制大小避免数据过期
 */
export function batch<P extends any[], R extends any>(
  handle: (list: P[]) => Promise<Map<P, R | Error>>,
  ms: number = 0,
  cache: BaseMemoryCache<string, R | Error> = MemoryCacheFactory.create(
    MemoryCacheEnum.Lru,
    {
      limit: 100,
    },
  ),
): (...args: P) => Promise<R> {
  //参数 => 结果 映射
  //参数列表
  const paramSet = new Set<string>()
  //当前是否被锁定
  let lock = false
  return async function(...args: P) {
    const argArray = JSON.stringify(args)
    paramSet.add(argArray)
    await Promise.all([wait(() => cache.has(argArray) || !lock), wait(ms)])
    if (!cache.has(argArray)) {
      try {
        lock = true
        Array.from(
          await handle(Array.from(paramSet).map(v => JSON.parse(v))),
        ).forEach(([k, v]) => {
          cache.add(JSON.stringify(k), v)
        })
      } finally {
        lock = false
      }
    }
    const value = cache.get(argArray)
    paramSet.delete(argArray)

    // noinspection SuspiciousTypeOfGuard
    if (value instanceof Error) {
      throw value
    }
    return value as R
  }
}
