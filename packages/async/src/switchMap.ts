import { switchMapByCache } from './switchMapByCache'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会丢弃过期的异步操作结果，这样的话性能会稍稍提高（主要是响应比较快的结果会立刻生效而不必等待前面的响应结果）
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function switchMap<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return switchMapByCache(fn, new Map())
}
