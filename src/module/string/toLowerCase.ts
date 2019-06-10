import { isNullOrUndefined } from '../obj/isNullOrUndefined'

/**
 * 字符串安全的转换为小写
 * @param str 字符串
 * @returns 转换后得到的全小写字符串
 */
export function toLowerCase<T = string | undefined | null>(str: T): T {
  if (isNullOrUndefined(str) || typeof str !== 'string') {
    return str
  }
  return str.toLowerCase() as any
}
