import { toUpperCase } from '../toUpperCase'
import { SnakeOrScreamingSnakeFrom } from './SnakeOrScreamingSnakeFrom'

/**
 * 大写下划线的转换器
 */
export class ScreamingSnakeConverter extends SnakeOrScreamingSnakeFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param list 字符串列表
   * @return {String} 字符串
   * @override
   */
  public to(list: string[]): string {
    return list.map(toUpperCase).join('_')
  }
}
