import { convert } from '../interface/convert'

/**
 * 桥接对象不存在的字段
 * @param map 代理的字段映射 Map
 * @returns 转换一个对象为代理对象
 */
export function bridge<
  T extends object,
  M extends object = Record<PropertyKey, PropertyKey>,
  K extends keyof M = any,
  R = T & Record<K, any>
>(map: M): (obj: T) => R {
  /**
   * 为对象添加代理的函数
   * @param obj 任何对象
   * @returns 代理后的对象
   */
  return function(obj: T): R {
    return convert(
      new Proxy(obj, {
        get(_, k) {
          if (Reflect.has(map, k)) {
            return Reflect.get(_, Reflect.get(map, k))
          }
          return Reflect.get(_, k)
        },
        set(_, k, v) {
          if (Reflect.has(map, k)) {
            Reflect.set(_, Reflect.get(map, k), v)
            return true
          }
          Reflect.set(_, k, v)
          return true
        },
      }),
    )
  }
}
