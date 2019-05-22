import { objectToMap } from '../obj/objectToMap'

/**
 * 桥接对象不存在的字段
 * @param map 代理的字段映射 Map
 * @returns 转换一个对象为代理对象
 */
export function bridge<T extends object>(
  map: Map<PropertyKey, PropertyKey> | object,
): (obj: any) => any {
  const _map = map instanceof Map ? map : objectToMap(map)
  /**
   * 为对象添加代理的函数
   * @param obj 任何对象
   * @returns 代理后的对象
   */
  return function(obj: T): T {
    return new Proxy(obj, {
      get(_, k) {
        if (_map.has(k)) {
          return Reflect.get(_, _map.get(k))
        }
        return Reflect.get(_, k)
      },
      set(_, k, v) {
        if (_map.has(k)) {
          Reflect.set(_, _map.get(k), v)
          return true
        }
        Reflect.set(_, k, v)
        return true
      },
    })
  }
}
