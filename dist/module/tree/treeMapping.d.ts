import { INode } from './INode';
/**
 * 遍历并映射一棵树的可选参数对象
 */
interface ITreeMappingOptions<T> {
    /**
     * 遍历子节点之前的操作。默认返回自身
     */
    before?: (node: T, ...args: any[]) => INode;
    /**
     * 遍历子节点之后的操作。默认返回自身
     */
    after?: (node: INode, ...args: any[]) => INode;
    /**
     * 递归的参数生成函数。默认返回一个空数组
     */
    paramFn?: (node: INode, ...args: any[]) => any[];
}
/**
 * 遍历并映射一棵树的每个节点
 * @param root 树节点
 * @param options 其他选项
 * @returns 递归遍历后的树节点
 */
export declare function treeMapping<T>(root: T, { before, after, paramFn, }?: Partial<ITreeMappingOptions<T>>): INode;
export {};
//# sourceMappingURL=treeMapping.d.ts.map