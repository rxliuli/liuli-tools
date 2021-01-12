import { dateFormat } from './dateFormat'
import { dateParse } from './dateParse'
import { isNullOrUndefined } from '../obj/isNullOrUndefined'
import { stringValidator } from '../string/StringValidator'
import { Nullable } from '../interface/Nullable'

/**
 * 日期格式化器
 * 包含格式化为字符串和解析字符串为日期的函数
 */
export class DateFormatter {
  /**
   * 日期格式化器
   */
  public static dateFormatter = new DateFormatter('yyyy-MM-dd')
  /**
   * 时间格式化器
   */
  public static timeFormatter = new DateFormatter('hh:mm:ss')
  /**
   * 日期时间格式化器
   */
  public static dateTimeFormatter = new DateFormatter('yyyy-MM-dd hh:mm:ss')
  /**
   * 构造函数
   * @param fmt 日期时间格式
   */
  constructor(private fmt: string) {}
  /**
   * 格式化
   * @param date 需要格式化的日期
   * @returns 格式化的字符串
   */
  public format(date: Date | null): string {
    if (isNullOrUndefined(date)) {
      return ''
    }
    return dateFormat(date!, this.fmt)
  }
  /**
   * 解析字符串为日期对象
   * @param str 字符串
   * @returns 解析得到的日期
   */
  public parse(str: string | null | undefined): Nullable<Date> {
    if (stringValidator.isEmpty(str)) {
      return null
    }
    return dateParse(str!, this.fmt)
  }
  /**
   * 将日期时间字符串转换为前端指定格式的字符串
   * 主要适用场景是前端接收到后端的日期时间一般是一个字符串，然而需要自定义格式的时候还必须先创建 {@link Date} 对象才能格式化，略微繁琐，故使用该函数
   * @param str 字符串
   * @param parseFmt 解析的日期时间格式。默认直接使用 {@link new Date()} 创建
   * @returns 转换后得到的字符串
   */
  public strFormat(str: string | null | undefined, parseFmt?: string): string {
    if (stringValidator.isEmpty(str)) {
      return ''
    }
    const date = parseFmt ? dateParse(str!, parseFmt) : new Date(str!)
    return dateFormat(date!, this.fmt)
  }
}
