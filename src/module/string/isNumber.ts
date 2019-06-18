import { stringValidator } from './StringValidator'

/**
 * 判断字符串是否位整数
 * @param str 需要进行判断的字符串
 * @returns 是否为小数
 * @deprecated 已废弃，请使用 {@link stringValidator#isInteger}
 */
export function isNumber(str: string): boolean {
  return stringValidator.isInteger(str)
}
