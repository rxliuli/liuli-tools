/**
 * 桥接对象为标准的树结构 {@link INode}
 * @param options 桥接对象
 * @param options.id 树结点的 id 属性名
 * @param options.parentId 树结点的父节点 id 属性名
 * @param options.child 树结点的子节点数组属性名
 * @param options.path 树结点的全路径属性名
 * @param options.args 其他参数
 */
export interface INodeBridge {
  id?: PropertyKey
  parentId?: PropertyKey
  child?: PropertyKey
  path?: PropertyKey
}
