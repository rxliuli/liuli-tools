import { bridge } from '../function/bridge'
import { INodeBridge } from './NodeBridge'
import { treeMapping } from './treeMapping'
import { INode } from './INode'

/**
 * 树节点桥接工具类
 * 主要实现了桥接 {@field bridge} {@field bridgeTree} 和 {@field bridgeList} 三个函数，事实上桥接之后再转换相当于做了两遍，但就目前而言暂且只能如此了
 */
export class NodeBridgeUtil {
  /**
   * 桥接对象为标准的树结构
   * @param {INodeBridge} [nodeBridge=new NodeBridge()] 桥接对象
   * @returns {Function} 代理函数
   */
  public bridge<T>({
    id = 'id',
    parentId = 'parentId',
    child = 'child',
    path = 'path',
  }: Partial<INodeBridge> = {}): (node: T) => INode {
    return bridge({
      id,
      parentId,
      child,
      path,
    })
  }
  /**
   * 桥接一棵完整的树
   * @param {INode} tree 树节点
   * @param {INodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
   * @returns {INode} 代理后的树对象
   */
  public bridgeTree<T>(tree: T, nodeBridge?: INodeBridge): INode {
    return treeMapping(tree, {
      before: this.bridge(nodeBridge),
    })
  }
  /**
   * 桥接一个树节点列表
   * @param {Array.<INode>} list 树节点列表
   * @param {INodeBridge} [nodeBridge=new NodeBridge()] 桥接对象
   * @returns {Array.<INode>} 代理后的树节点列表
   */
  public bridgeList<T>(list: T[], nodeBridge?: INodeBridge): INode[] {
    return list.map(this.bridge(nodeBridge))
  }
}

/**
 * 导出一个 NodeBridgeUtil 的实例
 */
export const nodeBridgeUtil = new NodeBridgeUtil()
