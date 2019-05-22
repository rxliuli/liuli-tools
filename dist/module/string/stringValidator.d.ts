/**
 * 字符串校验
 * TODO 使用 any 可能是个严重的错误。。。
 */
export declare class StringValidator {
    /**
     * 判断一个字符串是否为空字符串
     * @param str 字符串
     * @returns 是否为空字符串
     */
    isEmpty(str: any): boolean;
    /**
     * 判断一个字符串是否为空白的字符串
     * @param str 字符串
     * @returns 是否为空字符串
     */
    isBlank(str: any): boolean;
    /**
     * 判断字符串是否位小数
     * @param str 需要进行判断的字符串
     * @returns 是否为小数
     */
    isFloat(str: any): boolean;
    /**
     * 判断字符串是否位整数
     * @param str 需要进行判断的字符串
     * @returns 是否为小数
     */
    isInteger(str: any): boolean;
    /**
     * 判断邮箱的格式是否正确
     * @param str 邮箱字符串
     * @returns 是否是邮箱
     */
    isEmail(str: any): boolean;
    /**
     * 判断 ipv4 地址的格式是否正确
     * @param str ipv4 字符串
     * @returns 是否是 ipv4 地址
     */
    isIpv4(str: any): boolean;
    /**
     * 判断是否为固定电话
     * @param str 字符串
     * @returns 是否为固定电话
     */
    isTelephone(str: any): boolean;
    /**
     * 判断是否为移动电话
     * @param str 字符串
     * @returns 是否为移动电话
     */
    isMoblie(str: any): boolean;
    /**
     * 判断是否为域名
     * @param str 字符串
     * @returns 是否为域名
     */
    isDomain(str: any): boolean;
    /**
     * 判断是否为邮政编码
     * @param str 字符串
     * @returns 是否为邮政编码
     */
    isPostcode(str: any): boolean;
}
/**
 * 导出一个字符串校验的对象
 */
export declare const stringValidator: StringValidator;
//# sourceMappingURL=stringValidator.d.ts.map