import { returnItself } from '../function/returnItself'
import { treeMapping } from './treeMapping'

/**
 * 将树节点转为树节点列表
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Function} [options.bridge=returnItself] 代理函数，默认返回自身
 * @param {Boolean} [options.calcPath=false] 是否计算节点全路径，默认为 false
 * @returns {Array.<Object>} 树节点列表
 */
export function treeToList (
  root,
  { bridge = returnItself, calcPath = false } = {}
) {
  const res = []
  // @ts-ignore
  treeMapping(root, {
    before (node, parentPath) {
      const _node = bridge(node)
      // 是否计算全路径
      if (calcPath) {
        _node.path = (parentPath ? parentPath + ',' : '') + _node.id
      }
      // 此时追加到数组中
      res.push(_node)
      return _node
    },
    paramFn: node => (calcPath ? [node.path] : []),
  })
  return res
}
