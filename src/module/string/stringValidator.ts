import { isNullOrUndefined } from '../obj/isNullOrUndefined'
import { isRange } from '../number/isRange'
/**
 * 判断是否为小数的正则表达式
 */
const FloatRule = /^(-?\d+)(.\d+)?$/
/**
 * 判断是否为整数的正则表达式
 */
const IntegerRule = /^-?\d+$/
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
 */
const MobileRule = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/
/**
 * 判断是否为域名的正则表达式
 */
const DomainRule = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
/**
 * 判断是否为邮政编码的正则表达式
 */
const PostcodeRule = /^\d{6}$/

type IString = string | null | undefined

/**
 * 字符串校验
 * TODO 使用 any 可能是个严重的错误。。。
 */
export class StringValidator {
  /**
   * 判断一个字符串是否为空字符串
   * @param str 字符串
   * @returns 是否为空字符串
   */
  public isEmpty(str: IString): str is string {
    return isNullOrUndefined(str) || str === ''
  }
  /**
   * 判断一个字符串是否为空白的字符串
   * @param str 字符串
   * @returns 是否为空字符串
   */
  public isBlank(str: IString): str is string {
    return stringValidator.isEmpty(str) || str!.trim() === ''
  }

  /**
   * 判断字符串是否位小数
   * @param str 需要进行判断的字符串
   * @returns 是否为小数
   */
  public isFloat(str: IString): str is string {
    if (isNullOrUndefined(str)) {
      return false
    }
    return FloatRule.test(str)
  }

  /**
   * 判断字符串是否位整数
   * @param str 需要进行判断的字符串
   * @returns 是否为小数
   */
  public isInteger(str: IString): str is string {
    return !isNullOrUndefined(str) && IntegerRule.test(str)
  }
  /**
   * 判断邮箱的格式是否正确
   * @param str 邮箱字符串
   * @returns 是否是邮箱
   */
  public isEmail(str: IString): str is string {
    return !isNullOrUndefined(str) && EmailRule.test(str)
  }
  /**
   * 判断 ipv4 地址的格式是否正确
   * @param str ipv4 字符串
   * @returns 是否是 ipv4 地址
   */
  public isIpv4(str: IString): str is string {
    return !isNullOrUndefined(str) && Ipv4Rule.test(str)
  }
  /**
   * 判断字符串是否为正确的端口号
   * 正确的端口号是 1-65535
   * @param str 字符串
   * @returns 是否为端口号
   */
  public isPort(str: IString): str is string {
    // tslint:disable-next-line:radix
    return stringValidator.isInteger(str) && isRange(parseInt(str), 1, 65535)
  }
  /**
   * 判断是否为固定电话
   * @param str 字符串
   * @returns 是否为固定电话
   */
  public isTelephone(str: IString): str is string {
    return !isNullOrUndefined(str) && TelephoneRule.test(str)
  }
  /**
   * 判断是否为移动电话
   * @param str 字符串
   * @returns 是否为移动电话
   */
  public isMobile(str: IString): str is string {
    return !isNullOrUndefined(str) && MobileRule.test(str)
  }
  /**
   * 判断是否为域名
   * @param str 字符串
   * @returns 是否为域名
   */
  public isDomain(str: IString): str is string {
    return !isNullOrUndefined(str) && DomainRule.test(str)
  }
  /**
   * 判断是否为邮政编码
   * @param str 字符串
   * @returns 是否为邮政编码
   */
  public isPostcode(str: IString): str is string {
    return !isNullOrUndefined(str) && PostcodeRule.test(str)
  }
}

/**
 * 导出一个字符串校验的对象
 */
export const stringValidator = new StringValidator()
