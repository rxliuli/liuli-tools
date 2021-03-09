import { Merge } from 'type-fest'

export type EnhanceProxyHandler<T extends object> = Merge<
  ProxyHandler<T>,
  {
    get?(target: T, path: PropertyKey[], receiver: any): any
    set?(target: T, path: PropertyKey[], value: any, receiver: any): boolean
    apply?(target: T, path: PropertyKey[], thisArg: any, argArray?: any): any
  }
>

const key = Symbol('key')

/**
 * 增强 proxy
 * 添加参数 path 表示属性访问路径
 * @param obj
 * @param handler
 */
export function enhanceProxy<T extends object>(
  obj: T,
  handler: EnhanceProxyHandler<T>,
) {
  const _handler: ProxyHandler<T> = {}
  if (handler.get) {
    _handler.get = (target: T, p: PropertyKey, receiver: any): any => {
      if (p === 'toString') {
        throw new Error()
      }
      const path = (((target as any)[key] as any[]) || []).concat(p)
      const res = handler.get!(target, path, receiver)
      if (typeof res === 'object') {
        Reflect.set(res, key, path)
      }
      return res
    }
  }
  if (handler.set) {
    _handler.set = (
      target: T,
      p: PropertyKey,
      value: any,
      receiver: any,
    ): boolean => {
      return false
    }
  }
  if (handler.apply) {
    _handler.apply = (target: T, thisArg: any, argArray?: any): any => {}
  }
  return new Proxy(obj, _handler)
}
