import { returnItself } from '../function/returnItself'
import { INode } from './INode'

export interface IListToTreeOptoins<T> {
  bridge?: (node: T) => INode
  isRoot?: (node: INode) => boolean
}

/**
 * 将列表转换为树节点
 * 注: 该函数默认树的根节点只有一个，如果有多个，则返回一个数组
 * @param {Array.<Object>} list 树节点列表
 * @param {Object} [options] 其他选项
 * @param {Function} [options.isRoot] 判断节点是否为根节点。默认根节点的父节点为空
 * @param {Function} [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns {INode|INode[]} 树节点，或是树节点列表
 */
export function listToTree<T>(
  list: T[],
  {
    bridge = returnItself,
    isRoot = node => !node.parentId,
  }: Partial<IListToTreeOptoins<T>> = {},
): INode | INode[] | object {
  const arr: INode[] = []
  const res = list.reduce((root, _sub) => {
    const sub = bridge(_sub)
    list.forEach(_parent => {
      const parent = bridge(_parent)
      if (sub.parentId === parent.id) {
        ;(parent.child = parent.child || []).push(sub)
      }
    })
    if (isRoot(sub)) {
      root.push(sub)
    }
    return root
  }, arr)
  // 根据顶级节点的数量决定如何返回
  const len = res.length
  if (len === 0) return {}
  if (len === 1) return res[0]
  return res
}
