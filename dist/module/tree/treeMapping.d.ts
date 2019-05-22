import { INode } from './INode';
interface ITreeMappingOptions<T> {
    before?: (node: T, ...args: any[]) => INode;
    after?: (node: INode, ...args: any[]) => INode;
    paramFn?: (node: INode, ...args: any[]) => any[];
}
/**
 * 遍历并映射一棵树的每个节点
 * @param root 树节点
 * @param [options] 其他选项
 * @param [options.before=returnItself] 遍历子节点之前的操作。默认返回自身
 * @param [options.after=returnItself] 遍历子节点之后的操作。默认返回自身
 * @param [options.paramFn=(node, args) => []] 递归的参数生成函数。默认返回一个空数组
 * @returns 递归遍历后的树节点
 */
export declare function treeMapping<T>(root: T, { before, after, paramFn, }?: Partial<ITreeMappingOptions<T>>): INode;
export {};
//# sourceMappingURL=treeMapping.d.ts.map