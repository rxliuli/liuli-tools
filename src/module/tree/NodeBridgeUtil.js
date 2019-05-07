import { bridge } from '../function/bridge'
import { INodeBridge } from './NodeBridge'
import { treeForeach } from './treeForeach'
// eslint-disable-next-line no-unused-vars
import { INode } from './Node'

export class NodeBridgeUtil {
  /**
   * 桥接对象为标准的树结构
   * @param {INodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
   * @returns {Function} 代理函数
   */
  static bridge (nodeBridge) {
    return bridge(Object.assign(new INodeBridge(), nodeBridge))
  }
  /**
   * 桥接一棵完整的树
   * @param {INode} tree 桥接对象
   * @param {INodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
   * @returns {INode} 代理后的树对象
   */
  static bridgeTree (tree, nodeBridge) {
    const bridge = NodeBridgeUtil.bridge(nodeBridge)
    treeForeach(tree, {
      before: bridge,
    })
    return tree
  }
}
