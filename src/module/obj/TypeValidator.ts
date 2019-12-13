import { StringValidator } from '../string/StringValidator'
/**
 * 可能的类型
 */
enum Type {
  String,
  Number,
  Boolean,
  Undefined,
  Null,
  Symbol,
  PropertyKey,
  Object,
  Array,
  Function,
  Date,
  File,
  Blob,
  Stream,
  ArrayBuffer,
  ArrayBufferView,
  URLSearchParams,
  FormData,
}
/**
 * 校验变量的类型
 */
export class TypeValidator {
  /**
   * 类型枚举类对象
   */
  public static Type = Type
  /**
   * 获取变量的类型
   * @param val 变量
   * @returns 类型
   * 注: 此函数依赖于 ts 的编译枚举原理与约定 {@link TypeValidator} 中所有判断函数都是以 `is` 开头并于 {@link Type} 中的保持一致
   */
  public static getType(val: any): Type {
    for (const k of Object.keys(Type)) {
      if (StringValidator.isInteger(k)) {
        const type = Type[k as any]
        if ((TypeValidator as any)['is' + type](val)) {
          return Type[type as any] as any
        }
      }
    }
    throw new Error('无法识别的类型')
  }
  /**
   * 判断是否为指定类型
   * @param val 需要判断的值
   * @param types 需要判断的类型
   */
  public static isType(val: any, ...types: Type[]): boolean {
    return types.includes(TypeValidator.getType(val))
  }
  /**
   * 判断是否为字符串
   * @param val 需要判断的值
   * @returns 是否为字符串
   */
  public static isString(val: any): val is string {
    return typeof val === 'string'
  }
  /**
   * 判断是否为数字
   * @param val 需要判断的值
   * @returns 是否为数字
   */
  public static isNumber(val: any): val is number {
    return typeof val === 'number'
  }
  /**
   * 判断是否为布尔值
   * @param val 需要判断的值
   * @returns 是否为布尔值
   */
  public static isBoolean(val: any): val is boolean {
    return typeof val === 'boolean'
  }
  /**
   * 判断是否为 Symbol
   * @param val 需要判断的值
   * @returns 是否为 Symbol
   */
  public static isSymbol(val: any): val is symbol {
    return typeof val === 'symbol'
  }
  /**
   * 判断是否为 undefined
   * @param val 需要判断的值
   * @returns 是否为 undefined
   */
  public static isUndefined(val: any): val is undefined {
    return val === undefined
  }
  /**
   * 判断是否为 null
   * @param val 需要判断的值
   * @returns 是否为 null
   */
  public static isNull(val: any): val is null {
    return val === null
  }
  /**
   * 判断是否可以作为对象的属性
   * @param val 需要判断的值
   * @returns 是否为对象属性
   */
  public static isPropertyKey(val: any): val is PropertyKey {
    return (
      TypeValidator.isString(val) ||
      TypeValidator.isNumber(val) ||
      TypeValidator.isSymbol(val)
    )
  }
  /**
   * 判断是否为对象
   * 注: 函数（包括 ES6 箭头函数）将不被视为对象
   * @param val 需要判断的值
   * @returns 是否为对象
   */
  public static isObject(val: any): val is Object {
    return (
      !TypeValidator.isNull(val) &&
      !TypeValidator.isUndefined(val) &&
      typeof val === 'object'
    )
  }
  /**
   * 判断是否为数组
   * @param val 需要判断的值
   * @returns 是否为数组
   */
  public static isArray(val: any): val is any[] {
    return Array.isArray(val)
  }
  /**
   * 判断是否为数组
   * @param val 需要判断的值
   * @returns 是否为数组
   */
  public static isFunction(val: any): val is Function {
    return toString.call(val) === '[object Function]'
  }
  /**
   * 判断是否为日期
   * @param val 需要判断的值
   * @returns 是否为日期
   */
  public static isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]'
  }
  /**
   * 判断是否为浏览器文件类型
   * @param val 需要判断的值
   * @returns 是否为浏览器文件类型
   */
  public static isFile(val: any): val is File {
    return toString.call(val) === '[object File]'
  }
  /**
   * 判断是否为浏览器二进制类型
   * @param val 需要判断的值
   * @returns 是否为浏览器二进制类型
   */
  public static isBlob(val: any): val is Blob {
    return toString.call(val) === '[object Blob]'
  }
  /**
   * 判断是否为浏览器流类型
   * @param val 需要判断的值
   * @returns 是否为浏览器流类型
   */
  public static isStream(val: any): boolean {
    return TypeValidator.isObject(val) && TypeValidator.isFunction(val.pipe)
  }
  /**
   * 判断是否为浏览器 ArrayBuffer 类型
   * @param val 需要判断的值
   * @returns 是否为浏览器 ArrayBuffer 类型
   */
  public static isArrayBuffer(val: any): val is ArrayBuffer {
    return toString.call(val) === '[object ArrayBuffer]'
  }
  /**
   * 判断是否为浏览器 ArrayBufferView 类型
   * @param val 需要判断的值
   * @returns 是否为浏览器 ArrayBufferView 类型
   */
  public static isArrayBufferView(val: any): val is ArrayBufferView {
    return typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView
      ? ArrayBuffer.isView(val)
      : val && val.buffer && val.buffer instanceof ArrayBuffer
  }
  /**
   * 判断是否为浏览器 URLSearchParams 类型
   * @param val 需要判断的值
   * @returns 是否为浏览器 URLSearchParams 类型
   */
  public static isURLSearchParams(val: any): val is URLSearchParams {
    return !TypeValidator.isUndefined(val) && val instanceof URLSearchParams
  }
  /**
   * 判断是否为浏览器 FormData 类型
   * @param val 需要判断的值
   * @returns 是否为浏览器 FormData 类型
   */
  public static isFormData(val: any): val is FormData {
    return !TypeValidator.isUndefined(val) && val instanceof FormData
  }
}
