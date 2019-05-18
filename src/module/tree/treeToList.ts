import { returnItself } from '../function/returnItself'
import { treeMapping } from './treeMapping'
import { INode } from './INode'
import { assign } from '../obj/assign'

interface ITreeToListOptoins<T> {
  calcPath?: boolean
  bridge?: (node: T) => INode
}

/**
 * 将树节点转为树节点列表
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Boolean} [options.calcPath=false] 是否计算节点全路径，默认为 false
 * @param {Function} [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns {Array.<Object>} 树节点列表
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
      const node = bridge(_node)
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
