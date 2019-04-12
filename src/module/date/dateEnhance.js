// @ts-check
import { isRange } from '../number/isRange'
import { dateConstants } from './DateConstants'

/**
 * 一天标准的毫秒数
 */
const DAY_UNIT_TIME = 1000 * 60 * 60 * 24
/**
 * 日期增强
 * @property {Date} date
 */
export class DateEnhance {
  /**
   * 构造函数
   * @param {Date} date 要增强的日期
   */
  constructor (date) {
    /**
     * @field 要增强的日期
     */
    this.date = date
  }
  /**
   * 获取到年份
   * @returns {Number}
   */
  year () {
    return this.date.getFullYear()
  }
  /**
   * 获取月份
   * @returns {Number}
   */
  month () {
    return this.date.getMonth()
  }
  /**
   * 获取一年内的第多少天
   * @returns {Number}
   */
  dayOfYear () {
    return Math.floor(
      (this.date.getTime() - dateConstants.yearStart().getTime()) /
        DAY_UNIT_TIME
    )
  }
  /**
   * 获取一个月内的第多少天
   * @returns {Number}
   */
  dayOfMonth () {
    return this.date.getDate()
  }
  /**
   * 获取一个星期内的第多少天
   * @returns {Number}
   */
  dayOfWeek () {
    return this.date.getDay()
  }
  /**
   * 获取一年内的第多少星期
   * @returns {Number}
   */
  weekOfYear () {
    const day = this.dayOfYear()
    return Math.floor(day / 7 + (day % 7 === 0 ? 0 : 1))
  }
  /**
   * 获取一个月内的第多少星期
   * @returns {Number}
   */
  weekOfMonth () {
    const day = this.dayOfMonth()
    return Math.floor(day / 7 + (day % 7 === 0 ? 0 : 1))
  }
  /**
   * 获取季度
   * @returns {Number}
   */
  quarter () {
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
   * @returns {Number}
   */
  hour () {
    return this.date.getHours()
  }
  /**
   * 获取分钟
   * @returns {Number}
   */
  minute () {
    return this.date.getMinutes()
  }
  /**
   * 获取秒
   * @returns {Number}
   */
  second () {
    return this.date.getSeconds()
  }
  /**
   * 获取毫秒
   * @returns {Number}
   */
  milliSecond () {
    return this.date.getMilliseconds()
  }
}

/**
 * 获取一个增强的日期
 * @param {Date} date 要增强的日期
 * @returns {DateEnhance} 增强日期
 */
export function dateEnhance (date) {
  return new DateEnhance(date)
}
