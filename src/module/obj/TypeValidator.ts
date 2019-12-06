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
   */
  public static getType(val: any): Type {
    if (TypeValidator.isString(val)) {
      return Type.String
    }
    if (TypeValidator.isNumber(val)) {
      return Type.Number
    }
    if (TypeValidator.isBoolean(val)) {
      return Type.Boolean
    }
    if (TypeValidator.isUndefined(val)) {
      return Type.Undefined
    }
    if (TypeValidator.isNull(val)) {
      return Type.Null
    }
    if (TypeValidator.isSymbol(val)) {
      return Type.Symbol
    }
    if (TypeValidator.isPropertyKey(val)) {
      return Type.PropertyKey
    }
    if (TypeValidator.isObject(val)) {
      return Type.Object
    }
    if (TypeValidator.isArray(val)) {
      return Type.Array
    }
    if (TypeValidator.isFunction(val)) {
      return Type.Function
    }
    if (TypeValidator.isDate(val)) {
      return Type.Date
    }
    if (TypeValidator.isFile(val)) {
      return Type.File
    }
    if (TypeValidator.isBlob(val)) {
      return Type.Blob
    }
    if (TypeValidator.isStream(val)) {
      return Type.Stream
    }
    if (TypeValidator.isArrayBuffer(val)) {
      return Type.ArrayBuffer
    }
    if (TypeValidator.isArrayBufferView(val)) {
      return Type.ArrayBufferView
    }
    if (TypeValidator.isURLSearchParams(val)) {
      return Type.URLSearchParams
    }
    if (TypeValidator.isFormData(val)) {
      return Type.FormData
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
   * 内部使用的生成根据 typeof 判断的高阶函数
   * @param type
   */
  private static typeof<T>(type: string) {
    return function(val: any): val is T {
      return typeof val === type
    }
  }
  /**
   * 判断是否为字符串
   * @param val 需要判断的值
   * @returns 是否为字符串
   */
  public static isString = TypeValidator.typeof<string>('string')
  /**
   * 判断是否为数字
   * @param val 需要判断的值
   * @returns 是否为数字
   */
  public static isNumber = TypeValidator.typeof<number>('number')
  /**
   * 判断是否为布尔值
   * @param val 需要判断的值
   * @returns 是否为布尔值
   */
  public static isBoolean = TypeValidator.typeof<boolean>('boolean')
  /**
   * 判断是否为 Symbol
   * @param val 需要判断的值
   * @returns 是否为 Symbol
   */
  public static isSymbol = TypeValidator.typeof<symbol>('symbol')
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
