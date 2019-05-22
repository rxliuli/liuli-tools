import { INode } from './INode';
export interface IListToTreeOptoins<T> {
    bridge?: (node: T) => INode;
    isRoot?: (node: INode) => boolean;
}
/**
 * 将列表转换为树节点
 * 注: 该函数默认树的根节点只有一个，如果有多个，则返回一个数组
 * @param list 树节点列表
 * @param [options] 其他选项
 * @param [options.isRoot] 判断节点是否为根节点。默认根节点的父节点为空
 * @param [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns 树节点，或是树节点列表
 */
export declare function listToTree<T>(list: T[], { bridge, isRoot, }?: Partial<IListToTreeOptoins<T>>): INode | INode[] | object;
//# sourceMappingURL=listToTree.d.ts.map