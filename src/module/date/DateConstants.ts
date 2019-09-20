import { dateFormat } from './dateFormat'

/**
 * 计算月有多少天
 * @param date 日期
 * @returns 月的总天数
 */
function calcMonEndDay(date: Date) {
  const monthToDay: Array<[Set<number>, number]> = [
    [new Set([1, 3, 5, 7, 8, 10, 12]), 30],
    [new Set([4, 6, 9, 11]), 30],
    [new Set([2]), 28],
  ]
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const days = monthToDay.find(([monthSet]) => monthSet.has(month))![1]
  return days + (month === 2 && year % 4 === 0 ? 1 : 0)
}

/**
 * 日期固定时间点
 */
export class DateConstants {
  /**
   * 获取指定日期一天的开始时间
   * @param date 指定的时间，默认为当前日期
   * @returns 一天的开始时间
   */
  public static dayStart(date: Date = new Date()): Date {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T00:00:00.000`)
  }
  /**
   * 获取指定日期一天的结束时间
   * @param date 指定的时间，默认为当前日期
   * @returns 一天的结束时间
   */
  public static dayEnd(date: Date = new Date()): Date {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T23:59:59.999`)
  }
  /**
   * 获取指定日期所在月的开始时间
   * @param date 指定的时间，默认为当前日期
   * @returns 月的开始时间
   */
  public static monthStart(date: Date = new Date()): Date {
    return new Date(`${dateFormat(date, 'yyyy-MM')}-01T00:00:00.000`)
  }
  /**
   * 获取指定日期所在月的结束时间
   * @param date 指定的时间，默认为当前日期
   * @returns 月的结束时间
   */
  public static monthEnd(date: Date = new Date()): Date {
    return new Date(
      `${dateFormat(date, 'yyyy-MM')}-${calcMonEndDay(date)}T23:59:59.999`,
    )
  }
  /**
   * 获取指定日期所在年份的新年开始时间
   * @param date 指定的时间，默认为当前日期
   * @returns 新年开始时间
   */
  public static yearStart(date: Date = new Date()): Date {
    return new Date(`${date.getFullYear()}-01-01T00:00:00.000`)
  }
  /**
   * 获取指定日期所在年份的旧年结束时间
   * @param date 指定的时间，默认为当前日期
   * @returns 旧年结束时间
   */
  public static yearEnd(date: Date = new Date()): Date {
    return new Date(`${date.getFullYear()}-12-31T23:59:59.999`)
  }
}

/**
 * 导出一个日期固定时间点的对象
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export const dateConstants = DateConstants
