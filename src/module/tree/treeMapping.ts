import { arrayValidator } from '../array/arrayValidator'
import { returnItself } from '../function/returnItself'
import { INode } from './INode'
import { convert } from '../interface/convert'

interface ITreeMappingOptions<T> {
  before?: (node: T, ...args: any[]) => INode
  after?: (node: INode, ...args: any[]) => INode
  paramFn?: (node: INode, ...args: any[]) => any[]
}

/**
 * 遍历并映射一棵树的每个节点
 * @param root 树节点
 * @param [options] 其他选项
 * @param [options.before=returnItself] 遍历子节点之前的操作。默认返回自身
 * @param [options.after=returnItself] 遍历子节点之后的操作。默认返回自身
 * @param [options.paramFn=(node, args) => []] 递归的参数生成函数。默认返回一个空数组
 * @returns 递归遍历后的树节点
 */
export function treeMapping<T>(
  root: T,
  {
    before = convert(returnItself),
    after = returnItself,
    paramFn = (node, ...args) => [],
  }: Partial<ITreeMappingOptions<T>> = {},
): INode {
  /**
   * 遍历一颗完整的树
   * @param node 要遍历的树节点
   * @param  {...Object} [args] 每次递归遍历时的参数
   */
  function _treeMapping(node: any, ...args: any[]): INode {
    // 之前的操作
    const _node = before!(node, ...args)
    const _child = _node.child
    if (!arrayValidator.isEmpty(_child)) {
      _node.child = _child.map(v =>
        // 产生一个参数
        _treeMapping(v, ...paramFn(_node, ...args)),
      )
    }
    // 之后的操作
    return after(_node, ...args)
  }
  return _treeMapping(root)
}
