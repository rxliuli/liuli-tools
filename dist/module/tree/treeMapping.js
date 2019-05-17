import { arrayValidator } from '../array/arrayValidator';
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
export function treeMapping(root, { before = returnItself, after = returnItself, paramFn = (node, ...args) => [], } = {}) {
    /**
     * 遍历一颗完整的树
     * @param {INode} node 要遍历的树节点
     * @param  {...Object} [args] 每次递归遍历时的参数
     */
    function _treeMapping(node, ...args) {
        // 之前的操作
        let _node = before(node, ...args);
        const childs = _node.child;
        if (arrayValidator.isEmpty(childs)) {
            return _node;
        }
        // 产生一个参数
        const len = childs.length;
        for (let i = 0; i < len; i++) {
            childs[i] = _treeMapping(childs[i], ...paramFn(_node, ...args));
        }
        // 之后的操作
        return after(_node, ...args);
    }
    return _treeMapping(root);
}
