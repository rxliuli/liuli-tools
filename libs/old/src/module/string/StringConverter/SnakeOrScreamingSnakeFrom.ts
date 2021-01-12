import { IConverter } from './IConverter'

/**
 * 下划线风格解析
 */
export class SnakeOrScreamingSnakeFrom extends IConverter {
  /**
   * 将字符串解析为字符串列表
   *
   * @param str 字符串
   * @return {Array.<String>} 字符串列表
   * @override
   */
  public from(str: string): string[] {
    return str.split('_')
  }
}
