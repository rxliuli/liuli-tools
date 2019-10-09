import { ArrayKFn } from '../interface/ArrayKFn';
/**
 * 从数组中移除指定的元素
 * 注: 时间复杂度为 1~3On
 * @param arr 需要被过滤的数组
 * @param deleteItems 要过滤的元素数组
 * @param k 每个元素的唯一键函数
 */
export declare function filterItems<T, K>(arr: T[], deleteItems: T[], k?: ArrayKFn<T, K>): T[];
//# sourceMappingURL=filterItems.d.ts.map