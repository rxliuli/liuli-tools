import { StringValidator } from './StringValidator'

/**
 * 将空白字符串转换为 null
 *
 * @param str 将空字符串转换为 {@code null}
 * @returns 可能为 {@code null}
 */
export function blankToNull(str: string): string | null {
  return StringValidator.isBlank(str) ? null : str
}
