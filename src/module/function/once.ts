import { ReturnFunc } from '../interface/ReturnFunc'
import { compatibleAsync } from '../async/compatibleAsync'

/**
 * 将指定函数包装为只调用一次
 * @param fn 需要包装的函数
 * @returns 包装后的函数
 */
export function once<R, Fn extends (...args: any[]) => R>(
  fn: Fn,
): Fn & { origin: Fn; clear: () => void } {
  let flag = true
  let cache: R
  const res = new Proxy(fn, {
    apply(target, thisArg, args) {
      if (flag === false) {
        return cache
      }
      flag = false
      // 如果是异步函数则返回异步的结果
      return compatibleAsync(Reflect.apply(target, thisArg, args), res => {
        cache = res
        return cache
      })
    },
  })
  return Object.assign(res, {
    origin: fn,
    clear() {
      cache = null as any
    },
  })
}
