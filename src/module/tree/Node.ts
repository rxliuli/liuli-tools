/**
 * 基本的 Node 节点结构定义接口
 * @interface
 */
export class INode {
  /**
   * 构造函数
   * @param {Object} [options] 可选项参数
   * @param {String} [options.id] 树结点的 id 属性名
   * @param {String} [options.parentId] 树结点的父节点 id 属性名
   * @param {String} [options.child] 树结点的子节点数组属性名
   * @param {String} [options.path] 树结点的全路径属性名
   * @param {Array.<Object>} [options.args] 其他参数
   */
  constructor ({ id, parentId, child, path, ...args } = {}) {
    /**
     * @field 树结点的 id 属性名
     */
    this.id = id
    /**
     * @field 树结点的父节点 id 属性名
     */
    this.parentId = parentId
    /**
     * @field 树结点的子节点数组属性名
     */
    this.child = child
    /**
     * @field 树结点的全路径属性名
     */
    this.path = path
    Object.assign(this, args)
  }
}
