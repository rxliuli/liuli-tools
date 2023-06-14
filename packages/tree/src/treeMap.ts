import { TreeOption } from './treeOption'

/**
 * 树结构映射
 * 使用深度优先算法
 * @param nodeList
 * @param fn
 * @param options
 */
export function treeMap<
  T extends object,
  C extends TreeOption<T>,
  F extends (t: Omit<T, C['children']> & Record<C['children'], ReturnType<F>[]>, path: T[C['id']][]) => object,
>(nodeList: T[], fn: F, options: C): ReturnType<F>[] {
  function inner(nodeList: T[], parentPath: T[C['id']][]): any {
    return nodeList.map((node) => {
      const path = [...parentPath, node[options.id]]
      const children = node[options.children] as any as T[]
      if (!children) {
        return fn(node as any, path)
      }
      return fn(
        {
          ...node,
          [options.children]: inner(children, path),
        },
        path,
      )
    })
  }

  return inner(nodeList, [])
}
