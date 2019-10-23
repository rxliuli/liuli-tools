import { compatibleAsync } from '../async/compatibleAsync'

/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param fn 需要包装的函数
 * @param identity 参数转换的函数，参数为需要包装函数的参数
 * @returns 需要被包装的函数
 */
export function onceOfSameParam<Fn extends Function>(
  fn: Fn,
  identity = (args: any[]) =>
    `onceOfSameParam-${fn.toString()}-${JSON.stringify(args)}`,
): Fn & { origin: Fn; clear: (...keys: any[]) => void } {
  const cacheMap = new Map()
  const res = new Proxy(fn, {
    apply(_, _this, args) {
      const key = identity(args)
      const old = cacheMap.get(key)
      if (old !== undefined) {
        return old
      }
      const res = Reflect.apply(_, _this, args)
      return compatibleAsync(res, res => {
        cacheMap.set(key, res)
        return res
      })
    },
  })
  return Object.assign(res, {
    origin: fn,
    clear(...keys: any[]): void {
      if (keys.length) {
        cacheMap.clear()
      } else {
        keys.forEach(key => cacheMap.delete(key))
      }
    },
  })
}
