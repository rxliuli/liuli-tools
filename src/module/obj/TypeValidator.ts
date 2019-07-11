export class TypeValidator {
  public static isString(val: any): val is string {
    return typeof val === 'string'
  }
  public static isNumber(val: any): val is number {
    return typeof val === 'number'
  }
  public static isBoolean(val: any): val is boolean {
    return typeof val === 'boolean'
  }
  public static isUndefined(val: any): val is undefined {
    return val === undefined
  }

  public static isNull(val: any): val is null {
    return val === null
  }

  public static isSymbol(val: any): val is symbol {
    return typeof val === 'symbol'
  }

  public static isObject(val: any): boolean {
    return (
      !TypeValidator.isNull(val) &&
      !TypeValidator.isUndefined(val) &&
      typeof val === 'object'
    )
  }
  public static isArray(val: any): val is any[] {
    return Array.isArray(val)
  }
  public static isFunction(val: any): val is Function {
    return toString.call(val) === '[object Function]'
  }

  public static isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]'
  }
  public static isFile(val: any): val is File {
    return toString.call(val) === '[object File]'
  }
  public static isBlob(val: any): val is Blob {
    return toString.call(val) === '[object Blob]'
  }

  public static isStream(val: any): boolean {
    return TypeValidator.isObject(val) && TypeValidator.isFunction(val.pipe)
  }

  public static isArrayBuffer(val: any): val is ArrayBuffer {
    return toString.call(val) === '[object ArrayBuffer]'
  }
  public static isArrayBufferView(val: any): val is ArrayBufferView {
    let result
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val)
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer
    }
    return result
  }
  public static isURLSearchParams(val: any): val is URLSearchParams {
    return !TypeValidator.isUndefined(val) && val instanceof URLSearchParams
  }
  public static isFormData(val: any): val is FormData {
    return !TypeValidator.isUndefined(val) && val instanceof FormData
  }
}
