import { TreeOption } from './treeOption'

/**
 * 树结构归并
 * @param nodeList
 * @param reducer
 * @param initialValue
 * @param options
 * @returns
 */
export function treeReduce<T extends object, C extends TreeOption<T>, R>(
  nodeList: T[],
  /**
   * @param accumulator 累加器
   * @param node 当前节点
   * @param childrenResult 子节点归并结果
   * @param path 节点路径
   */
  reducer: (accumulator: R, node: T, childrenResult: R, path: T[C['id']][]) => R,
  initialValue: R,
  options: C,
): R {
  function inner(nodeList: T[], parentPath: T[C['id']][]): R {
    return nodeList.reduce((accumulator, node) => {
      const path = [...parentPath, node[options.id]]
      const children = (node[options.children] ?? []) as T[]
      return reducer(accumulator, node, inner(children, path), path)
    }, initialValue)
  }

  return inner(nodeList, [])
}
