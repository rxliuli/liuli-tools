import { returnItself } from '../function/returnItself';
/**
 * 将树节点转为树节点列表
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Boolean} [options.calcPath=false] 是否计算节点全路径，默认为 false
 * @param {Function} [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns {Array.<Object>} 树节点列表
 */
export declare function treeToList(root: any, { calcPath, bridge }?: {
    calcPath?: boolean | undefined;
    bridge?: typeof returnItself | undefined;
}): any[];
//# sourceMappingURL=treeToList.d.ts.map