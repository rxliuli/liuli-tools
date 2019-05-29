/**
 * 时间日期间隔
 */
export class DateBetween {
  /**
   * 构造函数
   * @param start 开始时间
   * @param end 结束时间
   */
  constructor(private start: Date, private end: Date) {}
  /**
   * 获取毫秒差值
   * @returns 毫秒差值
   */
  public milliSecond(): number {
    return this.end.getTime() - this.start.getTime()
  }
  /**
   * 获取秒差值
   * @returns 秒差值
   */
  public second(): number {
    return Math.floor(this.milliSecond() / 1000)
  }
  /**
   * 获取分钟差值
   * @returns 分钟差值
   */
  public minute(): number {
    return Math.floor(this.second() / 60)
  }
  /**
   * 获取小时差值
   * @returns 小时差值
   */
  public hour(): number {
    return Math.floor(this.minute() / 60)
  }
  /**
   * 获取天数差值
   * @returns 天数差值
   */
  public day(): number {
    return Math.floor(this.hour() / 24)
  }
  /**
   * 获取月份差值
   * 注: 此处获取的差值是按月计算的，即 2018-12-31 => 2019-01-01 也被认为相差一个月
   * @returns 月份差值
   */
  public month(): number {
    const year = this.year()
    const month = this.end.getMonth() - this.start.getMonth()
    return year * 12 + month
  }
  /**
   * 获取年份差值
   * 注: 此处获取的差值是按年计算的，即 2018-12-31 => 2019-01-01 也被认为相差一年
   * @returns 年份差值
   */
  public year(): number {
    return this.end.getFullYear() - this.start.getFullYear()
  }
}

/**
 * 获取两个时间的差值
 * @param start 开始时间
 * @param end 结束时间
 * @returns 差值对象
 */
export function dateBetween(start: Date, end: Date): DateBetween {
  return new DateBetween(start, end)
}
