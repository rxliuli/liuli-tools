import { INode } from './INode';
/**
 * 树转列表可选项参数接口
 */
interface ITreeToListOptoins<T> {
    /**
     * 是否计算节点全路径，默认为 false
     */
    calcPath?: boolean;
    /**
     * 桥接函数，默认返回自身
     */
    bridge?: (node: T) => INode;
}
/**
 * 将树节点转为树节点列表
 * 存在错误
 * @param root 树节点
 * @param options 其他选项
 * @returns 树节点列表
 */
export declare function treeToList2<T>(root: T, { calcPath, bridge, }?: Partial<ITreeToListOptoins<T>>): INode[];
/**
 * 将树节点转为树节点列表
 * 这里使用了循环进行遍历，而非传统的递归方式
 * @param root 树节点
 * @param options 其他选项
 * @returns 树节点列表
 */
export declare function treeToList<T>(root: T, { calcPath, bridge, }?: Partial<ITreeToListOptoins<T>>): INode[];
export {};
//# sourceMappingURL=treeToList.d.ts.map