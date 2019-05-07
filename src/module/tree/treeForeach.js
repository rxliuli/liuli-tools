import { flatMap } from '../array/flatMap'
import { arrayValidator } from '../array/arrayValidator'
import { returnItself } from '../function/returnItself'

/**
 * 遍历一棵树
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Function} [options.before=returnItself] 取子节点之前的操作。默认返回自身
 * @param {Function} [options.after=returnItself] 取子节点之后的操作。默认返回自身
 * @param {Function} [options.paramFn=(node, args) => []] 递归的参数生成函数。默认返回一个空数组
 * @returns {Array.<Object>} 树节点列表
 */
export function treeForeach (
  root,
  {
    before = returnItself,
    after = returnItself,
    paramFn = (node, args) => null,
  } = {}
) {
  function _treeToList (nodex, ...args) {
    // 之前的操作
    let node = before(nodex, args)
    const childs = node.child
    // 之后的操作
    node = after(node, args)
    return [
      node,
      ...(arrayValidator.isEmpty(childs)
        ? []
        : flatMap(childs, child => _treeToList(child, ...paramFn(node, args)))),
    ]
  }
  return _treeToList(root)
}
