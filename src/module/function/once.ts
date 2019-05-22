import { ReturnFunc } from '../interface/ReturnFunc'

/**
 * 将指定函数包装为只调用一次
 * @param fn 需要包装的函数
 * @returns 包装后的函数
 */
export function once<R>(fn: ReturnFunc<R>): ReturnFunc<R> {
  let flag = true
  let cache: R
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      if (flag === false) {
        return cache
      }
      flag = false
      const result = Reflect.apply(target, thisArg, args)
      // 如果是异步函数则返回异步的结果
      if (result instanceof Promise) {
        return result.then(res => {
          cache = res
          return res
        })
      }
      cache = result
      return cache
    },
  })
}
