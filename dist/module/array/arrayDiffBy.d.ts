import { returnItself } from '../function/returnItself';
/**
 * 数组之间的差异结果类
 * @class ArrayDiff
 */
export declare class ArrayDiff {
    /**
     * 构造函数
     * @param {Array} left 第一个数组独有的元素列表
     * @param {Array} right 第二个数组独有的元素列表
     * @param {Array} common 两个数组共有的元素列表。注意: 这里的元素实质上是从第一个集合获取的
     */
    constructor(left: any, right: any, common: any);
}
/**
 * 比较两个数组的差异
 * @param {Array} thanArr 第一个数组
 * @param {Array} thatArr 第二个数组
 * @param {Function} [kFn=returnItself] 每个元素的唯一标识产生函数
 * @returns {ArrayDiff} 比较的差异结果
 */
export declare function arrayDiffBy(thanArr: any, thatArr: any, kFn?: typeof returnItself): ArrayDiff;
//# sourceMappingURL=arrayDiffBy.d.ts.map