import { TreeOption } from './treeOption'
import { treeMap } from './treeMap'

/**
 * 树结构映射
 * 使用深度优先算法
 * @param nodeList
 * @param fn
 * @param options
 */
export function treeEach<T extends object, C extends TreeOption<T>>(
  nodeList: T[],
  fn: (t: T, path: T[C['id']][]) => void,
  options: C,
) {
  treeMap(
    nodeList,
    (node, path) => {
      fn(node as T, path)
      return node
    },
    options,
  )
}
