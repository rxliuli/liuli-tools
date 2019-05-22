import { StringStyleConverter } from './StringConverter/StringStyleConverter';
import { StringStyleType } from './StringConverter/StringStyleType';
/**
 * 字符串风格转换工具类
 */
export declare class StringStyleUtil {
    /**
     * 获取一个转换器的实例
     * 该函数获取的转换器可以任意复用，请优先使用函数
     * @param from 解析风格
     * @param to 转换风格
     * @return {StringStyleConverter} 转换器的实例
     */
    static getConverter(from: StringStyleType, to: StringStyleType): StringStyleConverter;
    /**
     * 直接转换字符串的风格
     * 请优先使用可以复用的 {@link StringStyleUtil.getConverter} 函数
     * @param from 解析风格
     * @param to 转换风格
     * @param str 要转换的字符串
     * @return {String} 转换得到的字符串
     */
    static convert(from: StringStyleType, to: StringStyleType, str: string): string;
}
//# sourceMappingURL=StringConverter.d.ts.map