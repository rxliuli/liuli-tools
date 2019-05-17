/**
 * 转换接口
 * @interface
 */
export declare class IConverter {
    /**
     * 将字符串解析为字符串列表
     *
     * @param {String} str 字符串
     * @return {Array.<String>} 字符串列表
     * @abstract
     */
    from(str: any): void;
    /**
     * 将字符串列表构造为字符串
     *
     * @param {Array.<String>} list 字符串列表
     * @return {String} 字符串
     * @abstract
     */
    to(list: any): void;
}
/**
 * 驼峰风格解析
 */
export declare class CamelOrPascalFrom extends IConverter {
    /**
     * 将字符串解析为字符串列表
     *
     * @param {String} str 字符串
     * @return {Array.<String>} 字符串列表
     * @override
     */
    from(str: any): any[];
}
/**
 * 小写开头的驼峰转换器
 *
 */
export declare class CamelConverter extends CamelOrPascalFrom {
    /**
     * 将字符串列表构造为字符串
     *
     * @param {Array.<String>} list 字符串列表
     * @return {String} 字符串
     * @override
     */
    to(list: any): any;
}
/**
 * 大写开头的驼峰转换器
 */
export declare class PascalConverter extends CamelOrPascalFrom {
    /**
     * 将字符串列表构造为字符串
     *
     * @param {Array.<String>} list 字符串列表
     * @return {String} 字符串
     * @override
     */
    to(list: any): any;
}
/**
 * 下划线风格解析
 */
export declare class SnakeOrScreamingSnakeFrom extends IConverter {
    /**
     * 将字符串解析为字符串列表
     *
     * @param {String} str 字符串
     * @return {Array.<String>} 字符串列表
     * @override
     */
    from(str: any): any;
}
/**
 * 小写下划线的转换器
 */
export declare class SnakeConverter extends SnakeOrScreamingSnakeFrom {
    /**
     * 将字符串列表构造为字符串
     *
     * @param {Array.<String>} list 字符串列表
     * @return {String} 字符串
     * @override
     */
    to(list: any): any;
}
/**
 * 大写下划线的转换器
 */
export declare class ScreamingSnakeConverter extends SnakeOrScreamingSnakeFrom {
    /**
     * 将字符串列表构造为字符串
     *
     * @param {Array.<String>} list 字符串列表
     * @return {String} 字符串
     * @override
     */
    to(list: any): any;
}
/**
 * @enum {Symbol} 字符串风格常量对象
 */
export declare const stringStyleType: {
    /**
     * 小写驼峰
     */
    Camel: symbol;
    /**
     * 大写驼峰
     */
    Pascal: symbol;
    /**
     * 小写下划线
     */
    Snake: symbol;
    /**
     * 大写下划线
     */
    ScreamingSnake: symbol;
};
/**
 * 转换器工厂
 */
export declare class ConverterFactory {
    /**
     * 获取一个转换器实例
     *
     * @param {Symbol} styleType 转换风格，使用了 {@link stringStyleType} 定义的常量对象
     * @return {IConverter} 转换器对象
     * @throws 如果获取未定义过的转换器，则会抛出异常
     */
    static getInstance(styleType: any): CamelConverter | PascalConverter | SnakeConverter | ScreamingSnakeConverter;
}
/**
 * 字符串风格转换器
 * 请不要直接使用构造函数创建，而是用 {@link StringStyleUtil.getConverter} 来获得一个转换器
 * @private
 */
export declare class StringStyleConverter {
    /**
     * 构造一个字符串任意风格转换器
     * @param {Symbol} from 转换字符串的风格
     * @param {Symbol} to 需要转换的风格
     * @private
     */
    constructor(from: any, to: any);
    /**
     * 转换字符串的风格
     *
     * @param {String} str 要转换的字符串
     * @return {String} 转换得到的字符串
     */
    convert(str: any): any;
}
/**
 * 字符串风格转换工具类
 */
export declare class StringStyleUtil {
    /**
     * 获取一个转换器的实例
     * 该函数获取的转换器可以任意复用，请优先使用函数
     * @param {stringStyleType} from 解析风格
     * @param {stringStyleType} to 转换风格
     * @return {StringStyleConverter} 转换器的实例
     */
    static getConverter(from: any, to: any): any;
    /**
     * 直接转换字符串的风格
     * 请优先使用可以复用的 {@link StringStyleUtil.getConverter} 函数
     * @param {stringStyleType} from 解析风格
     * @param {stringStyleType} to 转换风格
     * @param {String} str 要转换的字符串
     * @return {String} 转换得到的字符串
     */
    static convert(from: any, to: any, str: any): any;
}
//# sourceMappingURL=StringConverter.d.ts.map