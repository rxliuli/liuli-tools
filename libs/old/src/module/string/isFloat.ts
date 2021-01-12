import { stringValidator } from './StringValidator'

/**
 * 判断字符串是否位小数
 * @param str 需要进行判断的字符串
 * @returns 是否为小数
 * @deprecated 已废弃，请使用 {@link stringValidator#isFloat}
 */
export function isFloat(str: string | null | undefined): boolean {
  return stringValidator.isFloat(str)
}
