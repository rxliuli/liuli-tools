import { ReturnFunc } from '../interface/ReturnFunc'
import { wait } from './wait'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会按照调用顺序依次返回结果
 * 例如以下场景很常见：用户输入文字，即时响应结果，但第二次的结果先得到了，第一次的结果把第二次的覆盖掉了。那么，如何保证后面的结果一定在后面进行处理呢？
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export function mergeMap<R>(
  fn: ReturnFunc<Promise<R>>,
): ReturnFunc<Promise<R>> {
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
