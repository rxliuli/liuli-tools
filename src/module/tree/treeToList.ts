/**
 * 将一个树节点列表压平
 * @param node
 * @param options
 */
export function treeToList<
  T extends object,
  C extends { id: keyof T; children: keyof T; path: string },
  R extends T & { [K in C['path']]: NonNullable<T[C['id']]>[] }
>(node: T[], options: C): R[] {
  function inner(nodeList: T[], parentPath: T[C['id']][]): R[] {
    return nodeList.flatMap((node) => {
      const path = [...parentPath, node[options.id]]
      const children = (node[options.children] as any) as T[]
      const res = { ...node, [options.path]: path } as R
      if (!children) {
        return [res]
      }
      const newChildren = inner(children, path)
      return [res, ...newChildren]
    })
  }

  return inner(node, [])
}
