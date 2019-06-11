import { ReturnFunc } from '../interface/ReturnFunc'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会丢弃过期的异步操作结果，这样的话性能会稍稍提高（主要是响应比较快的结果会立刻生效而不必等待前面的响应结果）
 * 例如以下场景很常见：用户输入文字，即时响应结果，但第二次的结果先得到了，第一次的结果把第二次的覆盖掉了。那么，如何保证后面的结果一定在后面进行处理呢？
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function switchMap<R>(
  fn: ReturnFunc<Promise<R>>,
): ReturnFunc<Promise<R>> {
  // 当前执行的异步操作 id
  let id = 0
  // 最后一次异步操作的 id，小于这个的操作结果会被丢弃
  let last = 0
  // 缓存最后一次异步操作的结果
  let cache: R
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
