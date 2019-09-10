import { IConverter } from './IConverter'
import { CamelConverter } from './CamelConverter'
import { PascalConverter } from './PascalConverter'
import { SnakeConverter } from './SnakeConverter'
import { ScreamingSnakeConverter } from './ScreamingSnakeConverter'
import { StringStyleType } from './StringStyleType'

/**
 * 转换器工厂
 */
export class ConverterFactory {
  /**
   * 获取一个转换器实例
   *
   * @param styleType 转换风格，使用了 {@link stringStyleType} 定义的常量对象
   * @return {IConverter} 转换器对象
   * @throws 如果获取未定义过的转换器，则会抛出异常
   */
  public static getInstance(styleType: StringStyleType): IConverter {
    switch (styleType) {
      case StringStyleType.Camel:
        return new CamelConverter()
      case StringStyleType.Pascal:
        return new PascalConverter()
      case StringStyleType.Snake:
        return new SnakeConverter()
      case StringStyleType.ScreamingSnake:
        return new ScreamingSnakeConverter()
      default:
        throw new Error('No corresponding converter found')
    }
  }
}
