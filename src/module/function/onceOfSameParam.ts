import { compatibleAsync } from '../async/compatibleAsync'
import {
  BaseMemoryCache,
  MemoryCacheEnum,
  MemoryCacheFactory,
} from '../cache/MemoryCache'
import { Func } from 'liuli-types'

const onceOfSameParamIdentity = (fn: Func, args: any[]) =>
  `onceOfSameParam-${fn.toString()}-${JSON.stringify(args)}`

/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param fn 需要包装的函数
 * @param identity 参数转换的函数，参数为需要包装函数的参数
 * @param memoryCache
 * @returns 需要被包装的函数
 */
function _onceOfSameParam<Fn extends Func>(
  fn: Fn,
  identity = onceOfSameParamIdentity,
  memoryCache = MemoryCacheFactory.create(MemoryCacheEnum.Fifo),
): Fn & { origin: Fn; clear: (...keys: any[]) => void } {
  const res = new Proxy(fn, {
    apply(_, _this, args) {
      const key = identity(fn, args)
      const old = memoryCache.get(key)
      if (old !== undefined) {
        return old
      }
      const res = Reflect.apply(_, _this, args)
      return compatibleAsync(res, res => {
        memoryCache.add(key, res)
        return res
      })
    },
  })
  return Object.assign(res, {
    origin: fn,
    clear(...keys: any[]): void {
      if (keys.length) {
        memoryCache.clear()
      } else {
        keys.forEach(key => memoryCache.delete(key))
      }
    },
  })
}

export const onceOfSameParam = Object.assign(_onceOfSameParam, {
  identity: onceOfSameParamIdentity,
})
