import { isNullOrUndefined } from './isNullOrUndefined'

/**
 * 默认实现的 toString 函数
 * @param {Object} obj 对象
 * @returns {String} 字符串
 */
export function toString(obj: any): string {
  if (isNullOrUndefined(obj)) {
    return obj
  }
  return obj.toString()
}
