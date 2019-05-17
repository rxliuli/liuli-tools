/**
 * 树节点桥接工具类
 * 主要实现了桥接 {@field bridge} {@field bridgeTree} 和 {@field bridgeList} 三个函数，事实上桥接之后再转换相当于做了两遍，但就目前而言暂且只能如此了
 */
export declare class NodeBridgeUtil {
    /**
     * 桥接对象为标准的树结构
     * @param {NodeBridge} [nodeBridge=new NodeBridge()] 桥接对象
     * @returns {Function} 代理函数
     */
    bridge(nodeBridge: any): (obj: any) => any;
    /**
     * 桥接一棵完整的树
     * @param {INode} tree 树节点
     * @param {NodeBridge} [nodeBridge=new INodeBridge()] 桥接对象
     * @returns {INode} 代理后的树对象
     */
    bridgeTree(tree: any, nodeBridge: any): any;
    /**
     * 桥接一个树节点列表
     * @param {Array.<INode>} list 树节点列表
     * @param {NodeBridge} [nodeBridge=new NodeBridge()] 桥接对象
     * @returns {Array.<INode>} 代理后的树节点列表
     */
    bridgeList(list: any, nodeBridge: any): any;
}
/**
 * 导出一个 NodeBridgeUtil 的实例
 */
export declare const nodeBridgeUtil: NodeBridgeUtil;
//# sourceMappingURL=nodeBridgeUtil.d.ts.map