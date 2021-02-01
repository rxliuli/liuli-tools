import { TreeOption } from './treeOption'
import { treeMap } from './treeMap'

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
  return treeMap(
    nodeList,
    (node: any, path) => {
      const children = (node[options.children] as any) as T[] | undefined
      //如果是错误的节点直接炸掉
      if (!fn(node as T, path)) {
        return null
      }
      //如果是叶子节点就返回
      if (!children) {
        return node
      }
      //计算所有子节点中不是 null 的子节点
      const sub = children.filter((node) => node !== null)
      //如果所有子节点为 null 就炸掉
      if (sub.length === 0) {
        return null
      }
      return {
        ...node,
        children: sub,
      }
    },
    options,
  ).filter((node) => node !== null)
}
