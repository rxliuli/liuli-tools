import { bridge } from '../function/bridge'
import { INodeBridge } from './NodeBridge'
// eslint-disable-next-line no-unused-vars
import { INode } from './Node'
import { treeMapping } from './treeMapping'

export class NodeBridgeUtil {
  /**
   * 桥接对象为标准的树结构
   * @param {INodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
   * @returns {Function} 代理函数
   */
  bridge (nodeBridge) {
    return bridge(Object.assign(new INodeBridge(), nodeBridge))
  }
  /**
   * 桥接一棵完整的树
   * @param {INode} tree 树节点
   * @param {INodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
   * @returns {INode} 代理后的树对象
   */
  bridgeTree (tree, nodeBridge) {
    return treeMapping(tree, {
      before: this.bridge(nodeBridge),
    })
  }
  /**
   * 桥接一个树节点列表
   * @param {Array.<INode>} list 树节点列表
   * @param {INodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
   * @returns {Array.<INode>} 代理后的树节点列表
   */
  bridgeList (list, nodeBridge) {
    // @ts-ignore
    return list.map(this.bridge(nodeBridge))
  }
}

/**
 * 导出一个 NodeBridgeUtil 的实例
 */
export const nodeBridgeUtil = new NodeBridgeUtil()
