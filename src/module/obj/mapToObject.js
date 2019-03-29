// @ts-check
/**
 * 将 map 转换为 Object 对象
 * @param {Map} map map 键值表
 * @returns {Object} 转换得到的 Object 对象
 */
export function mapToObject (map) {
  const res = {}
  for (let [k, v] of map) {
    res[k] = v
  }
  return res
}
