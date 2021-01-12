import { wait } from './wait'
import { AsyncFunc } from '../interface/AsyncFunc'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会按照调用顺序依次返回结果，后面的执行的调用（不是调用结果）需要等待前面的，此函数适用于异步函数的内里执行也必须保证顺序时使用，否则请使用 {@link mergeMap} 函数
 * 注: 该函数其实相当于调用 {@code asyncLimiting(fn, {limit: 1})} 函数
 * 例如即时保存文档到服务器，当然要等待上一次的请求结束才能请求下一次，不然数据库保存的数据就存在谬误了
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function concatMap<Fn extends AsyncFunc>(fn: Fn): Fn {
  // 当前执行的异步操作 id
  let id = 0
  // 所执行的异步操作 id 列表
  const ids = new Set()
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const temp = id
      ids.add(temp)
      id++
      await wait(() => !ids.has(temp - 1))
      const res = await Reflect.apply(_, _this, args)
      ids.delete(temp)
      return res
    },
  })
}
