/**
 * 校验变量的类型
 */
export declare class TypeValidator {
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
     * 判断是否为 Symbol
     * @param val 需要判断的值
     * @returns 是否为 Symbol
     */
    static isSymbol(val: any): val is symbol;
    /**
     * 判断是否为对象
     * 注: 函数（包括 ES6 箭头函数）将不被视为对象
     * @param val 需要判断的值
     * @returns 是否为对象
     */
    static isObject(val: any): boolean;
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
//# sourceMappingURL=TypeValidator.d.ts.map