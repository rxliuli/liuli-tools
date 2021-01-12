import { dateEnhance } from './dateEnhance'

/**
 * 获取一年内的第多少星期
 * @param date 日期
 * @returns 这个日期第多少个星期
 * @deprecated 不推荐使用，请使用 {@see dateEnhance} 代替
 */
export function getYearWeek(date: Date): number {
  return dateEnhance(date).weekOfYear()
}
