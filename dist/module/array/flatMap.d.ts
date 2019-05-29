import { ArrayCallback } from '../interface/ArrayCallback';
/**
 * 自行实现 flatMap，将数组压平一层
 * @param arr 数组
 * @param fn 映射方法，将一个元素映射为一个数组
 * @returns 压平一层的数组
 */
export declare function flatMap<T, V>(arr: T[], fn?: ArrayCallback<T, V[]>): V[];
//# sourceMappingURL=flatMap.d.ts.map