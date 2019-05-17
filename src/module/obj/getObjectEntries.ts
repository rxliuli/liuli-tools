import { getObjectKeys } from './getObjectKeys'

/**
 * 获取对象中所有的属性及对应的值，包括 ES6 新增的 Symbol 类型的属性
 * @param {Object} obj 任何对象
 * @returns {Array.<String|Symbol>} 属性及其对应值的二维数组
 */
export function getObjectEntries(
  obj: Record<PropertyKey, any>,
): Array<[PropertyKey, any]> {
  return getObjectKeys(obj).map(k => [k, Reflect.get(obj, k)])
}
