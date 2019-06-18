import { stringValidator } from './StringValidator'

/**
 * 判断一个字符串是否为空白的字符串
 * @param str 字符串
 * @returns 是否为空字符串
 * @deprecated 已废弃，请使用 {@link stringValidator#isBlank}
 */
export function isBlank(str: any): boolean {
  return stringValidator.isBlank(str)
}
