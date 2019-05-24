import { returnItself } from '../function/returnItself'
import { treeMapping } from './treeMapping'
import { INode } from './INode'

/**
 * 树转列表可选项参数接口
 */
interface ITreeToListOptoins<T> {
  /**
   * 是否计算节点全路径，默认为 false
   */
  calcPath?: boolean
  /**
   * 桥接函数，默认返回自身
   */
  bridge?: (node: T) => INode
}

/**
 * 将树节点转为树节点列表
 * @param root 树节点
 * @param options 其他选项
 * @returns 树节点列表
 */
export function treeToList<T>(
  root: T,
  {
    calcPath = false,
    bridge = returnItself,
  }: Partial<ITreeToListOptoins<T>> = {},
): INode[] {
  const res: INode[] = []
  // @ts-ignore
  treeMapping(root, {
    before(_node, parentPath) {
      const node = bridge!(_node)
      // 是否计算全路径
      if (calcPath) {
        node.path = (parentPath ? parentPath + ',' : '') + node.id
      }
      // 此时追加到数组中
      res.push(node)
      return node
    },
    paramFn: node => (calcPath ? [node.path] : []),
  })
  return res
}
