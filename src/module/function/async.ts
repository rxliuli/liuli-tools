import { ReturnFunc } from '../interface/ReturnFunc'
import { convert } from '../interface/convert'

/**
 * 包装一个函数位异步函数
 * @param fn 任意一个函数
 * @typeparam R 原函数函数返回值类型
 * @returns 返回的异步结果 Promise 对象
 */
export function async<R>(
  fn: ReturnFunc<R>,
): ReturnFunc<R extends Promise<infer U> ? Promise<U> : Promise<R>> {
  return convert(
    new Proxy(fn, {
      async apply(_, _this, args) {
        return await Reflect.apply(_, _this, args)
      },
    }),
  )
}
