import { IConverter } from './IConverter';
import { StringStyleType } from './StringStyleType';
/**
 * 转换器工厂
 */
export declare class ConverterFactory {
    /**
     * 获取一个转换器实例
     *
     * @param styleType 转换风格，使用了 {@link stringStyleType} 定义的常量对象
     * @return {IConverter} 转换器对象
     * @throws 如果获取未定义过的转换器，则会抛出异常
     */
    static getInstance(styleType: StringStyleType): IConverter;
}
//# sourceMappingURL=ConverterFactory.d.ts.map