import { Overwrite } from 'utility-types'
import { TreeOption } from './treeOption'

/**
 * 树结构映射
 * @param node
 * @param fn
 * @param options
 */
export function treeMap<
  T extends object,
  C extends TreeOption<T>,
  R extends object
>(
  node: T,
  fn: (t: Overwrite<T, { [P in C['children']]: R[] }>, path: T[C['id']][]) => R,
  options: C,
): R {
  function inner(node: T, parentPath: T[C['id']][]): R {
    const path = [...parentPath, node[options.id]]
    const children = (node[options.children] as any) as T[]
    if (!children) {
      return fn(
        (node as never) as Overwrite<T, { [P in C['children']]: R[] }>,
        path,
      )
    }
    return fn(
      {
        ...node,
        [options.children]: children.map((node) => inner(node, path)) as R[],
      },
      path,
    )
  }

  return inner(node, [])
}
