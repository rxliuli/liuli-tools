// @ts-check
/**
 * 排除对象中的指定字段
 * 注: 此处将获得一个浅拷贝对象
 * @param {Object} object 排除对象
 * @param {...String} fields 要排除的字段
 * @returns {Object} 排除完指定字段得到的新的对象
 */
export function excludeFields (object, ...fields) {
  const set = new Set(fields)
  return Object.entries(object).reduce((res, [k, v]) => {
    if (!set.has(k)) {
      res[k] = v
    }
    return res
  }, {})
}
