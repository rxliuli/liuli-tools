import { dateFormat } from './dateFormat'
import { dateParse } from './dateParse'

/**
 * 日期格式化器
 * 包含格式化为字符串和解析字符串为日期的函数
 */
export class DateFormatter {
  /**
   * 构造函数
   * @param {String} fmt 日期时间格式
   */
  constructor (fmt) {
    /**
     * @field 日期时间格式
     */
    this.fmt = fmt
  }
  /**
   * 格式化
   * @param {Date} date 需要格式化的日期
   * @returns {String} 格式化的字符串
   */
  format (date) {
    return dateFormat(date, this.fmt)
  }
  /**
   * 解析
   * @param {String} str 字符串
   * @returns {Date} 解析得到的日期
   */
  parse (str) {
    return dateParse(str, this.fmt)
  }
  /**
   * 日期时间转换
   * @param {String} str 字符串
   * @param {String} fmt 日期时间格式
   * @param {String} parseFmt 解析的日期时间格式
   * @returns {String} 转换后得到的字符串
   */
  static convert (str, fmt, parseFmt) {
    const date = parseFmt ? dateParse(str, parseFmt) : new Date(str)
    return dateFormat(date, fmt)
  }
}
