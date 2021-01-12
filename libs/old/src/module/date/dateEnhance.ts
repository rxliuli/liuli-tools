import { isRange } from '../number/isRange'
import { dateConstants } from './DateConstants'

/**
 * 一天标准的毫秒数
 */
const DAY_UNIT_TIME = 1000 * 60 * 60 * 24
/**
 * 日期增强
 */
export class DateEnhance {
  /**
   * 构造函数
   * @param date 要增强的日期
   */
  constructor(private date: Date) {}
  /**
   * 获取到年份
   * @returns
   */
  public year(): number {
    return this.date.getFullYear()
  }
  /**
   * 获取月份
   * @returns
   * @deprecated 已废弃，请使用 {@link this#monthOfYear} 函数
   */
  public month(): number {
    return this.date.getMonth()
  }
  /**
   * 获取今年的第几个月份
   * 和 {@link this#month} 不同的是不再从 0 计算月份
   */
  public monthOfYear() {
    return this.date.getMonth() + 1
  }
  /**
   * 获取一年内的第多少天
   * 注: 这个天数指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
   * @returns
   */
  public dayOfYear(): number {
    return Math.ceil(
      (this.date.getTime() - dateConstants.yearStart(this.date).getTime()) /
        DAY_UNIT_TIME,
    )
  }
  /**
   * 获取一个月内的第多少天
   * 注: 这个天数指的是在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
   * @returns
   */
  public dayOfMonth(): number {
    return this.date.getDate()
  }
  /**
   * 获取一个星期内的第多少天
   * @returns
   */
  public dayOfWeek(): number {
    return this.date.getDay()
  }
  /**
   * 获取一年内的第多少星期
   * 注: 这个星期指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
   * @returns
   */
  public weekOfYear(): number {
    return Math.ceil(this.dayOfYear() / 7)
  }
  /**
   * 获取一个月内的第多少星期
   * @returns
   */
  public weekOfMonth(): number {
    return Math.ceil(this.dayOfMonth() / 7)
  }
  /**
   * 获取季度
   * @returns
   */
  public quarter(): number {
    const month = this.month()
    if (isRange(month, 0, 3)) {
      return 1
    } else if (isRange(month, 3, 6)) {
      return 2
    } else if (isRange(month, 6, 9)) {
      return 3
    } else {
      return 4
    }
  }
  /**
   * 获取小时
   * @returns
   */
  public hour(): number {
    return this.date.getHours()
  }
  /**
   * 获取分钟
   * @returns
   */
  public minute(): number {
    return this.date.getMinutes()
  }
  /**
   * 获取秒
   * @returns
   */
  public second(): number {
    return this.date.getSeconds()
  }
  /**
   * 获取毫秒
   * @returns
   */
  public milliSecond(): number {
    return this.date.getMilliseconds()
  }
}

/**
 * 获取一个增强的日期
 * @param date 要增强的日期
 * @returns 增强日期
 */
export function dateEnhance(date: Date): DateEnhance {
  return new DateEnhance(date)
}
