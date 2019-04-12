// @ts-check

/**
 * 时间日期间隔
 * @class DateBetween
 */
export class DateBetween {
  /**
   * 构造函数
   * @param {Date} start 开始时间
   * @param {Date} end 结束时间
   */
  constructor (start, end) {
    /**
     * @field start 开始时间
     */
    this.start = start
    /**
     * @field end 结束时间
     */
    this.end = end
  }
  /**
   * 获取毫秒差值
   * @returns {Number} 毫秒差值
   */
  milliSecond () {
    return this.end.getTime() - this.start.getTime()
  }
  /**
   * 获取秒差值
   * @returns {Number} 秒差值
   */
  second () {
    return Math.floor(this.milliSecond() / 1000)
  }
  /**
   * 获取分钟差值
   * @returns {Number} 分钟差值
   */
  minute () {
    return Math.floor(this.second() / 60)
  }
  /**
   * 获取小时差值
   * @returns {Number} 小时差值
   */
  hour () {
    return Math.floor(this.minute() / 60)
  }
  /**
   * 获取天数差值
   * @returns {Number} 天数差值
   */
  day () {
    return Math.floor(this.hour() / 24)
  }
  /**
   * 获取月份差值
   * 注: 此处获取的差值是按月计算的，即 2018-12-31 => 2019-01-01 也被认为相差一个月
   * @returns {Number} 月份差值
   */
  month () {
    const year = this.year()
    const month = this.end.getMonth() - this.start.getMonth()
    return year * 12 + month
  }
  /**
   * 获取年份差值
   * 注: 此处获取的差值是按年计算的，即 2018-12-31 => 2019-01-01 也被认为相差一年
   * @returns {Number} 年份差值
   */
  year () {
    return this.end.getFullYear() - this.start.getFullYear()
  }
}

/**
 * 获取两个时间的差值
 * @param {Date} start 开始时间
 * @param {Date} end 结束时间
 * @returns {DateBetween} 差值对象
 */
export function dateBetween (start, end) {
  return new DateBetween(start, end)
}
