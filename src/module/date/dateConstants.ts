import { dateFormat } from './dateFormat'

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
