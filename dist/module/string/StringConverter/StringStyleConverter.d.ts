import { StringStyleType } from './StringStyleType';
/**
 * 字符串风格转换器
 * 请不要直接使用构造函数创建，而是用 {@link StringStyleUtil.getConverter} 来获得一个转换器
 * @private
 */
export declare class StringStyleConverter {
    private fromConverter;
    private toConverter;
    /**
     * 构造一个字符串任意风格转换器
     * @param from 转换字符串的风格
     * @param to 需要转换的风格
     * @private
     */
    constructor(from: StringStyleType, to: StringStyleType);
    /**
     * 转换字符串的风格
     *
     * @param str 要转换的字符串
     * @return {String} 转换得到的字符串
     */
    convert(str: string): string;
}
//# sourceMappingURL=StringStyleConverter.d.ts.map