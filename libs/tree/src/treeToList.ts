import { TreeOption } from './treeOption'
import { treeMap } from './treeMap'

/**
 * 将一个树节点列表压平
 * @param nodeList
 * @param options
 */
export function treeToList<
  T extends object,
  C extends TreeOption<T> & { path: string },
  R extends T & { [K in C['path']]: NonNullable<T[C['id']]>[] }
>(nodeList: T[], options: C): R[] {
  const res: R[] = []
  treeMap(
    nodeList,
    (node, path) => {
      res.push({ ...node, [options.path]: path } as R)
      return node
    },
    options,
  )
  return res
}
