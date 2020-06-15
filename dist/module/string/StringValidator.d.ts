declare type IString = string | null | undefined;
/**
 * 字符串校验
 * @suppress 之后将会对类型定义进行不兼容修改，避免一直出现的两难问题
 */
export declare class StringValidator {
    /**
     * 判断一个字符串是否为空字符串
     * @param str 字符串
     * @returns 是否为空字符串
     */
    static isEmpty(str: IString): str is string;
    /**
     * 判断一个字符串是否为空白的字符串
     * @param str 字符串
     * @returns 是否为空字符串
     */
    static isBlank(str: IString): str is string;
    /**
     * 判断字符串是否位小数
     * @param str 需要进行判断的字符串
     * @returns 是否为小数
     */
    static isFloat(str: IString): str is string;
    /**
     * 判断字符串是否位整数
     * @param str 需要进行判断的字符串
     * @returns 是否为小数
     */
    static isInteger(str: IString): str is string;
    /**
     * 判断邮箱的格式是否正确
     * @param str 邮箱字符串
     * @returns 是否是邮箱
     */
    static isEmail(str: IString): str is string;
    /**
     * 判断 ipv4 地址的格式是否正确
     * @param str ipv4 字符串
     * @returns 是否是 ipv4 地址
     */
    static isIpv4(str: IString): str is string;
    /**
     * 判断字符串是否为正确的端口号
     * 正确的端口号是 1-65535
     * @param str 字符串
     * @returns 是否为端口号
     */
    static isPort(str: IString): str is string;
    /**
     * 判断是否为固定电话
     * @param str 字符串
     * @returns 是否为固定电话
     */
    static isTelephone(str: IString): str is string;
    /**
     * 判断是否为移动电话
     * @param str 字符串
     * @returns 是否为移动电话
     */
    static isMobile(str: IString): str is string;
    /**
     * 判断是否为域名
     * @param str 字符串
     * @returns 是否为域名
     */
    static isDomain(str: IString): str is string;
    /**
     * 判断是否为邮政编码
     * @param str 字符串
     * @returns 是否为邮政编码
     */
    static isPostcode(str: IString): str is string;
}
/**
 * 导出一个字符串校验的对象
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export declare const stringValidator: typeof StringValidator;
export {};
//# sourceMappingURL=StringValidator.d.ts.map