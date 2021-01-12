/**
 * 转换接口
 * @interface
 */
export class IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param str 字符串
   * @return {Array.<String>} 字符串列表
   * @abstract
   */
  public from(str: string): string[] {
    throw new Error('子类必须重写 from 函数')
  }
  /**
   * 将字符串列表构造为字符串
   *
   * @param list 字符串列表
   * @return {String} 字符串
   * @abstract
   */
  public to(list: string[]): string {
    throw new Error('子类必须重写 to 函数')
  }
}
