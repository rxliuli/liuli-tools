import { isNullOrUndefined } from './isNullOrUndefined'
import { getObjectValues } from './getObjectValues'

/**
 * 递归使对象不可变
 * @param {Object} obj 任何非空对象
 * @returns {Object} 新的不可变对象
 */
export function deepFreeze (obj) {
  if (isNullOrUndefined(obj)) {
    return null
  }
  // 数组和对象分别处理
  if (obj instanceof Array) {
    obj.forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v)
      }
    })
  } else if (obj instanceof Object) {
    getObjectValues(obj).forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v)
      }
    })
  }
  return Object.freeze(obj)
}
