import { ArrayKFn } from '../interface/ArrayKFn';
/**
 * js 的数组去重方法
 * @param arr 要进行去重的数组
 * @param k 唯一标识元素的方法，默认使用 {@link returnItself}
 * @returns 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
export declare function uniqueBy<T, K>(arr: T[], k?: ArrayKFn<T, K>): T[];
//# sourceMappingURL=uniqueBy.d.ts.map