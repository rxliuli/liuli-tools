import { objectToMap } from '../obj/objectToMap'

/**
 * 桥接对象不存在的字段
 * @param {Map.<String|Number|symbol, String|Number|symbol>|Object} map 代理的字段映射 Map
 * @returns {Function} 转换一个对象为代理对象
 */
export function bridge (map) {
  if (!(map instanceof Map)) {
    map = objectToMap(map)
  }
  /**
   * 为对象添加代理的函数
   * @param {Object} obj 任何对象
   * @returns {Proxy} 代理后的对象
   */
  return function (obj) {
    return new Proxy(obj, {
      get (target, k) {
        if (map.has(k)) {
          return Reflect.get(target, map.get(k))
        }
        return Reflect.get(target, k)
      },
      set (target, k, v) {
        if (map.has(k)) {
          Reflect.set(target, map.get(k), v)
          return true
        }
        Reflect.set(target, k, v)
        return true
      },
    })
  }
}
