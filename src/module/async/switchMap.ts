import { AsyncFunc } from '../interface/AsyncFunc'
import { PromiseDeconstruct } from '../interface/PromiseDeconstruct'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会丢弃过期的异步操作结果，这样的话性能会稍稍提高（主要是响应比较快的结果会立刻生效而不必等待前面的响应结果）
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function switchMap<Fn extends AsyncFunc>(fn: Fn): Fn {
  // 当前执行的异步操作 id
  let id = 0
  // 最后一次异步操作的 id，小于这个的操作结果会被丢弃
  let last = 0
  // 缓存最后一次异步操作的结果
  let cache: PromiseDeconstruct<ReturnType<Fn>>
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const temp = id
      id++
      const res = await Reflect.apply(_, _this, args)
      if (temp < last) {
        return cache
      }
      cache = res
      last = temp
      return res
    },
  })
}
