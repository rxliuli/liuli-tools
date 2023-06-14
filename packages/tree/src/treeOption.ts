export interface TreeOption<T extends object> {
  /**
   * 唯一标识的字段
   */
  id: keyof T
  /**
   * 子节点的字段
   */
  children: keyof T
}
