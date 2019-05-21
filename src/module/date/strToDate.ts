import { dateParse } from './dateParse'

/**
 * 解析字符串为 Date 对象
 * @deprecated 已弃用，请使用可读性更好的 {@link dateParse} 代替
 * @param dateStr 日期字符串
 * @param fmt 日期字符串的格式
 * 目前仅支持使用 y(年),M(月),d(日),h(时),m(分),s(秒),S(毫秒)
 * @returns 解析得到的 Date 对象
 */
export function strToDate(dateStr: string, fmt: string): Date | null {
  return dateParse(dateStr, fmt)
}
