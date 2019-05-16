import { bridge } from '../function/bridge'
import { NodeBridge } from './NodeBridge'
// eslint-disable-next-line no-unused-vars
import { INode } from './Node'
import { treeMapping } from './treeMapping'

/**
 * 树节点桥接工具类
 * 主要实现了桥接 {@field bridge} {@field bridgeTree} 和 {@field bridgeList} 三个函数，事实上桥接之后再转换相当于做了两遍，但就目前而言暂且只能如此了
 */
export class NodeBridgeUtil {
  /**
   * 桥接对象为标准的树结构
   * @param {NodeBridge} [nodeBridge=new NodeBridge()] 桥接对象
   * @returns {Function} 代理函数
   */
  bridge (nodeBridge) {
    return bridge(Object.assign(new NodeBridge(), nodeBridge))
  }
  /**
   * 桥接一棵完整的树
   * @param {INode} tree 树节点
   * @param {NodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
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
   * @param {NodeBridge} [nodeBridge=new NodeBridge()] 桥接对象
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
