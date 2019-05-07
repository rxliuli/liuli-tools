import { flatMap } from '../array/flatMap'
import { arrayValidator } from '../array/arrayValidator'
import { returnItself } from '../function/returnItself'

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
  // 树结构转列表，并且可以计算路径
  function _treeToList (nodex, parentPath) {
    const node = bridge(nodex)
    // 是否计算全路径
    if (calcPath) {
      node.path = (parentPath ? parentPath + ',' : '') + node.id
    }
    const childs = node.child
    return [
      node,
      ...(arrayValidator.isEmpty(childs)
        ? []
        : flatMap(childs, child => _treeToList(child, node.path))),
    ]
  }
  return _treeToList(root)
}
