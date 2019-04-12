// @ts-check
import { dateFormat } from './dateFormat'

/**
 * 日期固定时间点
 * @class DateConstants
 */
export class DateConstants {
  /**
   * 获取指定日期一天的开始时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 一天的开始时间
   */
  dayStart (date = new Date()) {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T00:00:00.000`)
  }
  /**
   * 获取指定日期一天的结束时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 一天的结束时间
   */
  dayEnd (date = new Date()) {
    return new Date(`${dateFormat(date, 'yyyy-MM-dd')}T23:59:59.999`)
  }
  /**
   * 获取指定日期所在年份的新年开始时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 新年开始时间
   */
  yearStart (date = new Date()) {
    return new Date(`${date.getFullYear()}-01-01T00:00:00.000`)
  }
  /**
   * 获取指定日期所在年份的旧年结束时间
   * @param {Date} [date=new Date()] 指定的时间，默认为当前日期
   * @returns {Date} 旧年结束时间
   */
  yearEnd (date = new Date()) {
    return new Date(`${date.getFullYear()}-12-31T23:59:59.999`)
  }
}

/**
 * 导出一个日期固定时间点的对象
 * @type {DateConstants}
 */
export const dateConstants = new DateConstants()
