import { returnItself } from '../function/returnItself';
/**
 * js 的数组去重方法
 * @param {Array.<Object>} arr 要进行去重的数组
 * @param {Function} [kFn=returnItself] 唯一标识元素的方法，默认使用 {@link returnItself}
 * @returns {Array.<Object>} 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
export declare function uniqueBy(arr: any, kFn?: typeof returnItself): any;
//# sourceMappingURL=uniqueBy.d.ts.map