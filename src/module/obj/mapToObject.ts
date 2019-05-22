/**
 * 将 Map 转换为 Object 对象
 * @param map Map 键值表
 * @returns 转换得到的 Object 对象
 */
export function mapToObject(map: Map<PropertyKey, any>): object {
  const res = {}
  for (const [k, v] of map) {
    Reflect.set(res, k, v)
  }
  return res
}
