import { getObjectKeys } from './getObjectKeys'

/**
 * 将对象的所有属性置空
 * @param {Object} obj 需要置空属性的对象
 * @returns {Object} 返回一个新的对象
 */
export function emptyAllField(
  obj: Record<PropertyKey, any>,
): Record<PropertyKey, any> {
  return getObjectKeys(obj).reduce((res, k) => {
    Reflect.set(res, k, null)
    return res
  }, {})
}
