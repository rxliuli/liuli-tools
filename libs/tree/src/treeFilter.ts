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
      .filter((node) => {
        const path = [...parentPath, node[options.id]]
        return fn(node, path)
      })
      .map((node) => {
        const children = (node[options.children] as any) as T[] | undefined
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
        const children = (node[options.children] as any) as T[] | undefined
        if (!children) {
          return true
        }
        return children.length > 0
      })
  }

  return inner(nodeList, [])
}
