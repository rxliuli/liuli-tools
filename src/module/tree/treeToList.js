import { flatMap } from '../array/flatMap'
import { Path, Id, Child } from './treeConstant'

/**
 * 将树节点转为树节点列表
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {String} [options.id='id'] 节点的 id 属性名。默认为 id
 * @param {String} [options.child='child'] 节点的子节点数组属性名。默认为 child
 * @param {String} [options.path='path'] 树结点的子节点数组属性名。默认为 path
 * @param {Boolean} [options.calcPath=false] 是否计算节点全路径，默认为 false
 * @returns {Array.<Object>} 树节点列表
 */
export function treeToList (
  root,
  { id = Id, child = Child, path = Path, calcPath = false } = {}
) {
  // 树结构转列表，并且计算路径
  function _treeToList (node, parentPath) {
    // 是否计算全路径
    if (calcPath) {
      node[path] = (parentPath ? parentPath + ',' : '') + node[id]
    }
    return [node].concat(
      node[child]
        ? flatMap(node[child], node => treeToList(node, node[path]))
        : []
    )
  }
  return _treeToList(root)
}
