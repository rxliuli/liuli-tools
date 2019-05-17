import { getObjectKeys } from './getObjectKeys'

/**
 * 将对象的所有属性置空
 * @param {Object} obj 需要置空属性的对象
 * @returns {Object} 返回一个新的对象
 */
export function emptyAllField (obj) {
  return getObjectKeys(obj).reduce((res, k) => {
    // @ts-ignore
    res[k] = null
    return res
  }, {})
}
