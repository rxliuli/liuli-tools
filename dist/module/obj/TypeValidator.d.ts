/**
 * 可能的类型
 */
declare enum Type {
    String = 0,
    Number = 1,
    Boolean = 2,
    Undefined = 3,
    Null = 4,
    Symbol = 5,
    PropertyKey = 6,
    Object = 7,
    Array = 8,
    Function = 9,
    Date = 10,
    File = 11,
    Blob = 12,
    Stream = 13,
    ArrayBuffer = 14,
    ArrayBufferView = 15,
    URLSearchParams = 16,
    FormData = 17
}
/**
 * 校验变量的类型
 */
export declare class TypeValidator {
    /**
     * 类型枚举类对象
     */
    static Type: typeof Type;
    /**
     * 获取变量的类型
     * @param val 变量
     * @returns 类型
     * 注: 此函数依赖于 ts 的编译枚举原理与约定 {@link TypeValidator} 中所有判断函数都是以 `is` 开头并于 {@link Type} 中的保持一致
     */
    static getType(val: any): Type;
    /**
     * 判断是否为指定类型
     * @param val 需要判断的值
     * @param types 需要判断的类型
     */
    static isType(val: any, ...types: Type[]): boolean;
    /**
     * 判断是否为字符串
     * @param val 需要判断的值
     * @returns 是否为字符串
     */
    static isString(val: any): val is string;
    /**
     * 判断是否为数字
     * @param val 需要判断的值
     * @returns 是否为数字
     */
    static isNumber(val: any): val is number;
    /**
     * 判断是否为布尔值
     * @param val 需要判断的值
     * @returns 是否为布尔值
     */
    static isBoolean(val: any): val is boolean;
    /**
     * 判断是否为 Symbol
     * @param val 需要判断的值
     * @returns 是否为 Symbol
     */
    static isSymbol(val: any): val is symbol;
    /**
     * 判断是否为 undefined
     * @param val 需要判断的值
     * @returns 是否为 undefined
     */
    static isUndefined(val: any): val is undefined;
    /**
     * 判断是否为 null
     * @param val 需要判断的值
     * @returns 是否为 null
     */
    static isNull(val: any): val is null;
    /**
     * 判断是否可以作为对象的属性
     * @param val 需要判断的值
     * @returns 是否为对象属性
     */
    static isPropertyKey(val: any): val is PropertyKey;
    /**
     * 判断是否为对象
     * 注: 函数（包括 ES6 箭头函数）将不被视为对象
     * @param val 需要判断的值
     * @returns 是否为对象
     */
    static isObject(val: any): val is Object;
    /**
     * 判断是否为数组
     * @param val 需要判断的值
     * @returns 是否为数组
     */
    static isArray(val: any): val is any[];
    /**
     * 判断是否为数组
     * @param val 需要判断的值
     * @returns 是否为数组
     */
    static isFunction(val: any): val is Function;
    /**
     * 判断是否为日期
     * @param val 需要判断的值
     * @returns 是否为日期
     */
    static isDate(val: any): val is Date;
    /**
     * 判断是否为浏览器文件类型
     * @param val 需要判断的值
     * @returns 是否为浏览器文件类型
     */
    static isFile(val: any): val is File;
    /**
     * 判断是否为浏览器二进制类型
     * @param val 需要判断的值
     * @returns 是否为浏览器二进制类型
     */
    static isBlob(val: any): val is Blob;
    /**
     * 判断是否为浏览器流类型
     * @param val 需要判断的值
     * @returns 是否为浏览器流类型
     */
    static isStream(val: any): boolean;
    /**
     * 判断是否为浏览器 ArrayBuffer 类型
     * @param val 需要判断的值
     * @returns 是否为浏览器 ArrayBuffer 类型
     */
    static isArrayBuffer(val: any): val is ArrayBuffer;
    /**
     * 判断是否为浏览器 ArrayBufferView 类型
     * @param val 需要判断的值
     * @returns 是否为浏览器 ArrayBufferView 类型
     */
    static isArrayBufferView(val: any): val is ArrayBufferView;
    /**
     * 判断是否为浏览器 URLSearchParams 类型
     * @param val 需要判断的值
     * @returns 是否为浏览器 URLSearchParams 类型
     */
    static isURLSearchParams(val: any): val is URLSearchParams;
    /**
     * 判断是否为浏览器 FormData 类型
     * @param val 需要判断的值
     * @returns 是否为浏览器 FormData 类型
     */
    static isFormData(val: any): val is FormData;
}
export {};
//# sourceMappingURL=TypeValidator.d.ts.map