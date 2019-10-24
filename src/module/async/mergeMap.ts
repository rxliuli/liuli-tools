import { wait } from './wait'
import { AsyncFunc } from '../interface/AsyncFunc'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会按照调用顺序依次返回结果，后面的调用的结果需要等待前面的，所以如果不关心过时的结果，请使用 {@link switchMap} 函数
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function mergeMap<Fn extends AsyncFunc>(fn: Fn): Fn {
  // 当前执行的异步操作 id
  let id = 0
  // 所执行的异步操作 id 列表
  const ids = new Set()
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const prom = Reflect.apply(_, _this, args)
      const temp = id
      ids.add(temp)
      id++
      await wait(() => !ids.has(temp - 1))
      ids.delete(temp)
      return await prom
    },
  })
}
