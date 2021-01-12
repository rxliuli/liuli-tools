/**
 * 将 Object 对象 转换为 Map
 * @param obj Object 对象
 * @returns 转换得到的 Map 键值表
 */
export function objectToMap(
  obj: Record<PropertyKey, any>,
): Map<PropertyKey, any> {
  return Object.keys(obj).reduce(
    (map, k) => map.set(k, Reflect.get(obj, k)),
    new Map(),
  )
}
