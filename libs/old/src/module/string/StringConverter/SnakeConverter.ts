import { toLowerCase } from '../toLowerCase'
import { SnakeOrScreamingSnakeFrom } from './SnakeOrScreamingSnakeFrom'

/**
 * 小写下划线的转换器
 */
export class SnakeConverter extends SnakeOrScreamingSnakeFrom {
  /**
   * 将字符串列表构造为字符串
   *
   * @param list 字符串列表
   * @return {String} 字符串
   * @override
   */
  public to(list: string[]): string {
    return list.map(toLowerCase).join('_')
  }
}
