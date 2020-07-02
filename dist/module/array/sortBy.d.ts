import { ArrayKFn } from '../interface/ArrayKFn';
/**
 * 快速根据指定函数对数组进行排序
 * TODO 此处有 bug，会改变原数组的顺序（在计算的 key 值相同的情况下）
 * 注: 使用递归实现，对于超大数组（其实前端的数组不可能特别大吧？#笑）可能造成堆栈溢出
 * @param arr 需要排序的数组
 * @param k 对数组中每个元素都产生可比较的值的函数，默认返回自身进行比较
 * @returns 排序后的新数组
 */
export declare function sortBy<T, K>(arr: T[], k?: ArrayKFn<T, K>): T[];
//# sourceMappingURL=sortBy.d.ts.map