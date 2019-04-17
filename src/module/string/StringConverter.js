// @ts-check
import { onecOfSameParam } from '../function/onecOfSameParam'

/**
 * 转换基类
 */
export class IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param {String} str 字符串
   * @return {Array.<String>} 字符串列表
   * @abstract
   */
  from (str) {
    throw new Error('子类必须重写 from 函数')
  }

  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @abstract
   */
  to (list) {
    throw new Error('子类必须重写 to 函数')
  }
}

/**
 * 驼峰风格解析
 */
export class CamelOrPascalFrom extends IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param {String} str 字符串
   * @return {Array.<String>} 字符串列表
   * @override
   */
  from (str) {
    const result = []
    let len = str.length
    let old = 0
    for (let i = 0; i < len; i++) {
      const c = str.charAt(i)
      if (c >= 'A' && c <= 'Z') {
        if (i !== 0) {
          result.push(str.substring(old, i))
        }
        old = i
      }
    }
    if (old !== str.length) {
      result.push(str.substring(old, str.length))
    }
    return result
  }
}

/**
 * 小写开头的驼峰转换器
 *
 */
export class CamelConverter extends CamelOrPascalFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    const str = list
      .map(s => s.substring(0, 1).toUpperCase() + s.substring(1))
      .join()
    return str.substring(0, 1).toLowerCase() + str.substring(1)
  }
}

/**
 * 大写开头的驼峰转换器
 */
export class PascalConverter extends CamelOrPascalFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    return list
      .map(s => s.substring(0, 1).toUpperCase() + s.substring(1))
      .join()
  }
}
/**
 * 下划线风格解析
 */
export class SnakeOrScreamingSnakeFrom extends IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param {String} str 字符串
   * @return {Array.<String>} 字符串列表
   * @override
   */
  from (str) {
    return str.split('_')
  }
}
/**
 * 小写下划线的转换器
 */
export class SnakeConverter extends SnakeOrScreamingSnakeFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    return list.map(s => s.toLowerCase()).join('_')
  }
}
/**
 * 大写下划线的转换器
 */
export class ScreamingSnakeConverter extends SnakeOrScreamingSnakeFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param {Array.<String>} list 字符串列表
   * @return {String} 字符串
   * @override
   */
  to (list) {
    return list.map(s => s.toUpperCase()).join('_')
  }
}
/**
 * @enum {Symbol} 字符串风格常量对象
 */
export const stringStyleType = {
  /**
   * 小写驼峰
   */
  Camel: Symbol(1),
  /**
   * 大写驼峰
   */
  Pascal: Symbol(2),
  /**
   * 小写下划线
   */
  Snake: Symbol(3),
  /**
   * 大写下划线
   */
  ScreamingSnake: Symbol(4)
}

/**
 * 转换器工厂
 */
class ConverterFactory {
  /**
   * 获取一个转换器实例
   *
   * @param {Symbol} styleType 转换风格，使用了 {@link stringStyleType} 定义的常量对象
   * @return {IConverter} 转换器对象
   * @throws 如果获取未定义过的转换器，则会抛出异常
   */
  static getInstance (styleType) {
    switch (styleType) {
      case stringStyleType.Camel:
        return new CamelConverter()
      case stringStyleType.Pascal:
        return new PascalConverter()
      case stringStyleType.Snake:
        return new SnakeConverter()
      case stringStyleType.ScreamingSnake:
        return new ScreamingSnakeConverter()
      default:
        throw new Error('No corresponding converter found')
    }
  }
}

/**
 * 字符串风格转换器
 * 请不要直接使用构造函数创建，而是用 {@link StringStyleUtil.getConverter} 来获得一个转换器
 * @private
 */
export class StringStyleConverter {
  /**
   * 构造一个字符串任意风格转换器
   * @param {Symbol} from 转换字符串的风格
   * @param {Symbol} to 需要转换的风格
   * @private
   */
  constructor (from, to) {
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
   * @param {String} str 要转换的字符串
   * @return {String} 转换得到的字符串
   */
  convert (str) {
    if (str === undefined || str === null || str.length === 0) {
      return str
    }
    return this.toConverter.to(this.fromConverter.from(str))
  }
}

/**
 * 包装获取字符串风格转换器
 * 此处采用了单例模式，每种转换器只会有一个
 *
 * @param {stringStyleType} from 解析风格
 * @param {stringStyleType} to 转换风格
 * @return {StringStyleConverter} 转换器的实例
 */
const _getConverter = onecOfSameParam(
  /**
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @return {StringStyleConverter} 转换器的实例
   */
  (from, to) => new StringStyleConverter(from, to),
  /**
   * 根据参数生成唯一标识
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @return {String} 唯一参数标识字符串
   */
  (from, to) => from.toString() + to.toString()
)

/**
 * 字符串风格转换工具类
 */
export class StringStyleUtil {
  /**
   * 获取一个转换器的实例
   * 该函数获取的转换器可以任意复用，请优先使用函数
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @return {StringStyleConverter} 转换器的实例
   */
  static getConverter (from, to) {
    return _getConverter(from, to)
  }
  /**
   * 直接转换字符串的风格
   * 请优先使用可以复用的 {@link StringStyleUtil.getConverter} 函数
   * @param {stringStyleType} from 解析风格
   * @param {stringStyleType} to 转换风格
   * @param {String} str 要转换的字符串
   * @return {String} 转换得到的字符串
   */
  static convert (from, to, str) {
    return StringStyleUtil.getConverter(from, to).convert(str)
  }
}
