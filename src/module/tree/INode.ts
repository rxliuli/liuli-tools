/**
 * 基本的 Node 节点结构定义接口
 * @param [options] 可选项参数
 * @param [options.id] 树结点的 id 属性名
 * @param [options.parentId] 树结点的父节点 id 属性名
 * @param [options.child] 树结点的子节点数组属性名
 * @param [options.path] 树结点的全路径属性名
 * @param [options.args] 其他参数
 * @interface
 */
export interface IParamNode<T> {
  id: number | string
  parentId: number | string | null | undefined
  child: T[]
  path: string | null | undefined
}

export interface INode extends IParamNode<INode> {}
