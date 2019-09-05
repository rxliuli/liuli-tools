/**
 * 转换接口
 * @interface
 */
export declare class IConverter {
    /**
     * 将字符串解析为字符串列表
     *
     * @param str 字符串
     * @return {Array.<String>} 字符串列表
     * @abstract
     */
    from(str: string): string[];
    /**
     * 将字符串列表构造为字符串
     *
     * @param list 字符串列表
     * @return {String} 字符串
     * @abstract
     */
    to(list: string[]): string;
}
//# sourceMappingURL=IConverter.d.ts.map