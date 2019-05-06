import { isNullOrUndefined } from '../obj/isNullOrUndefined'
/**
 * 判断是否为小数的正则表达式
 */
const FloatRegexp = new RegExp('^(-?\\d+)(.\\d+)?$')
/**
 * 判断是否为整数的正则表达式
 */
const IntegerRegexp = new RegExp('^-?\\d+$')
/**
 * 字符串校验
 */
export class StringValidator {
  /**
   * 判断一个字符串是否为空字符串
   * @param {String} str 字符串
   * @returns {Boolean} 是否为空字符串
   */
  isEmpty (str) {
    return isNullOrUndefined(str) || str === ''
  }
  /**
   * 判断一个字符串是否为空白的字符串
   * @param {String} str 字符串
   * @returns {Boolean} 是否为空字符串
   */
  isBlank (str) {
    return stringValidator.isEmpty(str) || str.trim() === ''
  }

  /**
   * 判断字符串是否位小数
   * @param {String} str 需要进行判断的字符串
   * @returns {Boolean} 是否为小数
   */
  isFloat (str) {
    return FloatRegexp.test(str)
  }

  /**
   * 判断字符串是否位整数
   * @param {String} str 需要进行判断的字符串
   * @returns {Boolean} 是否为小数
   */
  isInteger (str) {
    return IntegerRegexp.test(str)
  }
}

/**
 * 导出一个字符串校验的对象
 */
export const stringValidator = new StringValidator()
