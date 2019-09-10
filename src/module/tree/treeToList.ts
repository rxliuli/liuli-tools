import { returnItself } from '../function/returnItself'
import { treeMapping } from './treeMapping'
import { INode } from './INode'
import { ArrayValidator } from '../array/ArrayValidator'
import { isNullOrUndefined } from '../obj/isNullOrUndefined'

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
 * 存在错误
 * @param root 树节点
 * @param options 其他选项
 * @returns 树节点列表
 */
export function treeToList2<T>(
  root: T,
  {
    calcPath = false,
    bridge = returnItself,
  }: Partial<ITreeToListOptoins<T>> = {},
): INode[] {
  const res: INode[] = []
  const filterSet = new Set<T>()
  let i = 0
  // @ts-ignore
  treeMapping(root, {
    before(_node, parentPath) {
      // @ts-ignore
      console.log(++i, _node)
      const node = bridge!(_node)
      if (filterSet.has(_node)) {
        return node
      }
      filterSet.add(_node)
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

/**
 * 将树节点转为树节点列表
 * 这里使用了循环进行遍历，而非传统的递归方式
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
  const temp = bridge(root)
  if (calcPath) {
    temp.path = temp.id + ''
  }
  // 利用队列缓存所有未处理的节点
  const queue: INode[] = [temp]
  // 使用 Set 防止可能的重复引用
  const filterSet = new Set<INode>()
  // 使用 lastIdMap 避免重复添加
  const lastIdMap = new Map()
  for (let value: INode; queue.length > 0; ) {
    const first = queue.shift() as any
    value = bridge(first)
    // 判断重复
    if (value === undefined || filterSet.has(first)) {
      continue
    }
    filterSet.add(first)
    res.push(value)
    const child = value.child
    if (ArrayValidator.isEmpty(child)) {
      continue
    }
    const childNonIllegal = child.filter(
      v => !isNullOrUndefined(v) || filterSet.has(v),
    )
    // TODO 这里和上面的代码明显重复，待优化。。。
    queue.push(
      ...(calcPath
        ? childNonIllegal.map(v => {
            const _v = bridge(v as any)
            // 如果最后一个的 id 等于自身，说明已经被添加过了
            if (lastIdMap.get(_v.id) === _v.id) {
              return _v
            }
            // 使用父节点绝对路径 + 当前 id
            _v.path = value.path + ',' + _v.id
            lastIdMap.set(_v.id, _v.id)
            return _v
          })
        : childNonIllegal),
    )
  }
  return res
}
