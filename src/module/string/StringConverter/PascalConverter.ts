import { toLowerCase } from '../toLowerCase'
import { toUpperCase } from '../toUpperCase'
import { CamelOrPascalFrom } from './CamelOrPascalFrom'

/**
 * 大写开头的驼峰转换器
 */
export class PascalConverter extends CamelOrPascalFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param list 字符串列表
   * @return {String} 字符串
   * @override
   */
  public to(list: string[]): string {
    return list.reduce((res, s) => {
      const str = toLowerCase(s)
      return (res += toUpperCase(str.substring(0, 1)) + str.substring(1))
    }, '')
  }
}
