import { TreeOption } from './treeOption'

/**
 * 过滤一个树节点列表
 * @param nodeList
 * @param fn
 * @param options
 */
export function treeFilter<T extends object, C extends TreeOption<T>>(
  nodeList: T[],
  fn: (t: T, path: T[C['id']][]) => boolean,
  options: C,
): T[] {
  function inner(nodeList: T[], parentPath: T[C['id']][]): T[] {
    return nodeList
      .map((node) => {
        const children = (node[options.children] as any) as T[] | undefined
        //不筛选叶子节点
        if (!children) {
          return node
        }
        return {
          ...node,
          [options.children]: inner(children, [
            ...parentPath,
            node[options.id],
          ]),
        }
      })
      .filter((node) => {
        const path = [...parentPath, node[options.id]]
        const children = (node[options.children] as any) as T[] | undefined
        //筛选掉空的枝干节点
        return fn(node, path) && (children === undefined || children.length > 0)
      })
  }

  return inner(nodeList, [])
}
