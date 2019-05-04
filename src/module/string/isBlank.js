import { isEmpty } from './isEmpty'

/**
 * 判断一个字符串是否为空白的字符串
 * @param {String} str 字符串
 * @returns {Boolean} 是否为空字符串
 */
export function isBlank (str) {
  return isEmpty(str) || str.trim() === ''
}
