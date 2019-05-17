import { returnItself } from '../function/returnItself';
/**
 * 遍历并映射一棵树的每个节点
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Function} [options.before=returnItself] 遍历子节点之前的操作。默认返回自身
 * @param {Function} [options.after=returnItself] 遍历子节点之后的操作。默认返回自身
 * @param {Function} [options.paramFn=(node, args) => []] 递归的参数生成函数。默认返回一个空数组
 * @returns {INode} 递归遍历后的树节点
 */
export declare function treeMapping(root: any, { before, after, paramFn, }?: {
    before?: typeof returnItself | undefined;
    after?: typeof returnItself | undefined;
    paramFn?: ((node: any, ...args: any[]) => never[]) | undefined;
}): any;
//# sourceMappingURL=treeMapping.d.ts.map