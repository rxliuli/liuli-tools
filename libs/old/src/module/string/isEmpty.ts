import { stringValidator } from './StringValidator'

/**
 * 判断一个字符串是否为空字符串
 * @param str 字符串
 * @returns 是否为空字符串
 * @deprecated 已废弃，请使用 {@link stringValidator#isEmpty}
 */
export function isEmpty(str: any): boolean {
  return stringValidator.isEmpty(str)
}
