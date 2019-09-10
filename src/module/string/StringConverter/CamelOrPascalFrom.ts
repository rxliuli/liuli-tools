import { IConverter } from './IConverter'

/**
 * 驼峰风格解析
 */
export class CamelOrPascalFrom extends IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param str 字符串
   * @return {Array.<String>} 字符串列表
   * @override
   */
  public from(str: string): string[] {
    const result = []
    const len = str.length
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
