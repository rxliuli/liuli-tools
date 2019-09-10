import { getObjectValues } from './getObjectValues'
import { TypeValidator } from './TypeValidator';

/**
 * 递归使对象不可变
 * @param obj 任何非空对象
 * @returns 新的不可变对象
 */
export function deepFreeze<T extends object>(obj: T): T {
  // 数组和对象分别处理
  if (TypeValidator.isArray(obj)) {
    obj.forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v)
      }
    })
  } else if (TypeValidator.isObject(obj)) {
    getObjectValues(obj).forEach(v => {
      if (typeof v === 'object') {
        deepFreeze(v)
      }
    })
  }
  return Object.freeze(obj)
}
