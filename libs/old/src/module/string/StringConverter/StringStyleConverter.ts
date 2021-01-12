import { stringValidator } from '../StringValidator'
import { ConverterFactory } from './ConverterFactory'
import { IConverter } from './IConverter'
import { StringStyleType } from './StringStyleType'

/**
 * 字符串风格转换器
 * 请不要直接使用构造函数创建，而是用 {@link StringStyleUtil.getConverter} 来获得一个转换器
 * @private
 */
export class StringStyleConverter {
  private fromConverter: IConverter
  private toConverter: IConverter
  /**
   * 构造一个字符串任意风格转换器
   * @param from 转换字符串的风格
   * @param to 需要转换的风格
   * @private
   */
  constructor(from: StringStyleType, to: StringStyleType) {
    /**
     * @field 解析字符串风格的转换器
     * @type {IConverter}
     * @private
     */
    this.fromConverter = ConverterFactory.getInstance(from)
    /**
     * @field 构造字符串风格的转换器
     * @type {IConverter}
     * @private
     */
    this.toConverter = ConverterFactory.getInstance(to)
  }
  /**
   * 转换字符串的风格
   *
   * @param str 要转换的字符串
   * @return {String} 转换得到的字符串
   */
  public convert(str: string): string {
    if (stringValidator.isEmpty(str)) {
      return str
    }
    return this.toConverter.to(this.fromConverter.from(str))
  }
}
