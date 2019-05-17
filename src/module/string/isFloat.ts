import { stringValidator } from './stringValidator'

/**
 * 判断字符串是否位小数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 * @deprecated 已废弃，请使用 {@link stringValidator#isFloat}
 */
export function isFloat(str: string): boolean {
  return stringValidator.isFloat(str)
}
