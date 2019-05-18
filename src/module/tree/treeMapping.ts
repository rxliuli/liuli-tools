import { arrayValidator } from '../array/arrayValidator'
import { returnItself } from '../function/returnItself'
import { IParamNode, INode } from './INode'
import { assign } from '../obj/assign'

interface ITreeMappingOptions<T> {
  before?: (node: T, ...args: any[]) => INode
  after?: (node: INode, ...args: any[]) => INode
  paramFn?: (node: INode, ...args: any[]) => any[]
}

class TreeMappingOptionsImpl<T> implements ITreeMappingOptions<T> {
  public before: (node: T, ...args: any[]) => INode = returnItself
  public after: (node: INode, ...args: any[]) => INode = returnItself
  public paramFn: (node: INode, ...args: any[]) => any[] = (node, ...args) => []
}

/**
 * 遍历并映射一棵树的每个节点
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Function} [options.before=returnItself] 遍历子节点之前的操作。默认返回自身
 * @param {Function} [options.after=returnItself] 遍历子节点之后的操作。默认返回自身
 * @param {Function} [options.paramFn=(node, args) => []] 递归的参数生成函数。默认返回一个空数组
 * @returns {IParamNode} 递归遍历后的树节点
 */
export function treeMapping<T>(
  root: T,
  options: ITreeMappingOptions<T>,
): INode {
  const _options = assign(new TreeMappingOptionsImpl(), options)
  /**
   * 遍历一颗完整的树
   * @param {IParamNode} node 要遍历的树节点
   * @param  {...Object} [args] 每次递归遍历时的参数
   */
  function _treeMapping(node: any, ...args: any[]): INode {
    // 之前的操作
    const _node = _options.before(node, ...args)
    const _child = _node.child
    if (!arrayValidator.isEmpty(_child)) {
      _node.child = _child.map(v =>
        // 产生一个参数
        _treeMapping(v, ..._options.paramFn(_node, ...args)),
      )
    }
    // 之后的操作
    return _options.after(_node, ...args)
  }
  return _treeMapping(root)
}
