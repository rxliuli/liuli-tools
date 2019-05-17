import { blankToNull } from './../string/blankToNull'
import { getObjectKeys } from './getObjectKeys'

/**
 * 置空对象所有空白的属性
 *
 * @param {Object} obj 对象
 * @returns {Object} 将所有的空白属性全部转换为 null 的新对象
 */
export function blankToNullField(
  obj: Record<PropertyKey, any>,
): Record<PropertyKey, any> {
  return getObjectKeys(obj).reduce((res, k) => {
    const v = Reflect.get(obj, k)
    Reflect.set(res, k, typeof v === 'string' ? blankToNull(v) : v)
    return res
  }, {})
}
