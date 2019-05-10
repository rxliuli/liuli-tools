import { isNullOrUndefined } from './isNullOrUndefined'

/**
 * 获取对象中所有的属性，包括 ES6 新增的 Symbol 类型的属性
 * @param {Object} object 任何对象
 * @returns {Array.<String|Symbol>} 属性数组
 */
export function getObjectKeys (object) {
  if (isNullOrUndefined(object)) {
    return []
  }
  return [
    ...Object.getOwnPropertyNames(object),
    ...Object.getOwnPropertySymbols(object),
  ]
}
