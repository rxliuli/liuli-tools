import { stringValidator } from './stringValidator'

/**
 * 判断一个字符串是否为空字符串
 * @param {String} str 字符串
 * @returns {Boolean} 是否为空字符串
 * @deprecated 已废弃，请使用 {@link stringValidator#isEmpty}
 */
export function isEmpty (str) {
  return stringValidator.isEmpty(str)
}
