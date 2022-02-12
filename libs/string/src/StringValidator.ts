/**
 * 判断是否为小数的正则表达式
 */
const FloatRule = /^(-?\d+)(.\d+)?$/
/**
 * 判断是否为整数的正则表达式
 */
const IntegerRule = /^-?\d+$/
// noinspection RegExpSingleCharAlternation
/**
 * 判断是否为邮箱的正则表达式
 */
const EmailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
/**
 * 判断是否为 ipv4 地址的正则表达式
 */
const Ipv4Rule = /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/
/**
 * 判断是否为固定电话的正则表达式
 */
const TelephoneRule = /^0[1-9][0-9]{1,2}-[2-8][0-9]{6,7}$/
/**
 * 判断是否为移动电话的正则表达式
 * 注：不在判断二三位的数字，具体参考：http://caibaojian.com/phone-regexp.html
 */
const MobileRule = /^1\d{10}$/
/**
 * 判断是否为域名的正则表达式
 */
const DomainRule = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
/**
 * 判断是否为邮政编码的正则表达式
 */
const PostcodeRule = /^\d{6}$/

/**
 * 字符串校验
 * @suppress 之后将会对类型定义进行不兼容修改，避免一直出现的两难问题
 */
export class StringValidator {
  /**
   * 判断一个字符串是否为空字符串
   * @param str 字符串
   * @returns 是否为空字符串
   */
  public static isEmpty(str: string): boolean {
    return str === ''
  }

  /**
   * 判断一个字符串是否为空白的字符串
   * @param str 字符串
   * @returns 是否为空字符串
   */
  public static isBlank(str: string): boolean {
    return StringValidator.isEmpty(str) || str!.trim() === ''
  }

  /**
   * 判断字符串是否位小数
   * @param str 需要进行判断的字符串
   * @returns 是否为小数
   */
  public static isFloat(str: string): boolean {
    return FloatRule.test(str)
  }

  /**
   * 判断字符串是否位整数
   * @param str 需要进行判断的字符串
   * @returns 是否为小数
   */
  public static isInteger(str: string): boolean {
    return IntegerRule.test(str)
  }

  /**
   * 判断邮箱的格式是否正确
   * @param str 邮箱字符串
   * @returns 是否是邮箱
   */
  public static isEmail(str: string): boolean {
    return EmailRule.test(str)
  }

  /**
   * 判断 ipv4 地址的格式是否正确
   * @param str ipv4 字符串
   * @returns 是否是 ipv4 地址
   */
  public static isIpv4(str: string): boolean {
    return Ipv4Rule.test(str)
  }

  /**
   * 判断字符串是否为正确的端口号
   * 正确的端口号是 1-65535
   * @param str 字符串
   * @returns 是否为端口号
   */
  public static isPort(str: string): boolean {
    return (
      StringValidator.isInteger(str) &&
      parseInt(str) > 1 &&
      parseInt(str) < 65535
    )
  }

  /**
   * 判断是否为固定电话
   * @param str 字符串
   * @returns 是否为固定电话
   */
  public static isTelephone(str: string): boolean {
    return TelephoneRule.test(str)
  }

  /**
   * 判断是否为移动电话
   * @param str 字符串
   * @returns 是否为移动电话
   */
  public static isMobile(str: string): boolean {
    return MobileRule.test(str)
  }

  /**
   * 判断是否为域名
   * @param str 字符串
   * @returns 是否为域名
   */
  public static isDomain(str: string): boolean {
    return DomainRule.test(str)
  }

  /**
   * 判断是否为邮政编码
   * @param str 字符串
   * @returns 是否为邮政编码
   */
  public static isPostcode(str: string): boolean {
    return PostcodeRule.test(str)
  }
}
