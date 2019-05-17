import { returnItself } from '../function/returnItself';
/**
 * 将列表转换为树节点
 * 注: 该函数默认树的根节点只有一个，如果有多个，则返回一个数组
 * @param {Array.<Object>} list 树节点列表
 * @param {Object} [options] 其他选项
 * @param {Function} [options.isRoot] 判断节点是否为根节点。默认根节点的父节点为空
 * @param {Function} [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns {Object|Array.<String>} 树节点，或是树节点列表
 */
export declare function listToTree(list: any, { isRoot, bridge }?: {
    isRoot?: ((node: any) => boolean) | undefined;
    bridge?: typeof returnItself | undefined;
}): any;
//# sourceMappingURL=listToTree.d.ts.map