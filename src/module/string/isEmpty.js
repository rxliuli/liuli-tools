import { isNullOrUndefined } from '../obj/isNullOrUndefined'

/**
 * 判断一个字符串是否为空字符串
 * @param {String} str 字符串
 * @returns {Boolean} 是否为空字符串
 */
export function isEmpty (str) {
  return isNullOrUndefined(str) || str === ''
}
