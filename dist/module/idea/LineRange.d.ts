export declare type Comparable = number | string | Date;
export declare type NoComparable = Exclude<any, Comparable>;
/**
 * 比较两个区间的位置的结果
 * 有前后两个区间 `[a,b], [c,d], a<b, c<d`
 */
export declare enum LineRangeCompareEnum {
    This_NotOverlap_That = 0,
    This_Overlap_That = 1,
    This_JustIncluded_That = 2,
    This_Included_That = 3,
    StartEqual_That_JustIncluded_This = 4,
    This_Equal_That = 5,
    StartEqual_This_JustIncluded_That = 6,
    That_NotOverlap_This = 7,
    That_Overlap_This = 8,
    That_JustIncluded_This = 9,
    That_Included_This = 10
}
export declare class LineRange<T> {
    readonly start: T;
    readonly end: T;
    static CompareEnum: typeof LineRangeCompareEnum;
    private _compare?;
    private constructor();
    /**
     * 创建一个区间
     * 注意，默认是 [闭-开) 区间
     * https://baike.baidu.com/item/%E5%8D%8A%E5%BC%80%E5%8D%8A%E9%97%AD%E5%8C%BA%E9%97%B4#1
     * @param start
     * @param end
     * @param kFn
     */
    static create<T>(start: T, end: T, kFn?: (t: T) => number): LineRange<T>;
    /**
     * 获取某个字段的可比较值
     * @param field 字段名，目前只允许 start|end
     * @returns 一个可比较的值，要么是 {@type Comparable}, 要么是经过 {@property _compare} 转换后的 {@type number}
     */
    get(field: 'start' | 'end'): number | T;
    /**
     * 比较两个区间的位置
     * @param that 另一个区间对象
     * @returns 比较的结果
     */
    compare(that: LineRange<T>): LineRangeCompareEnum;
    /**
     * 判断两者是否重叠
     * @param that 另一个区间对象
     * @returns 是否有重叠
     */
    isOverlap(that: LineRange<T>): boolean;
    /**
     * 获取两个区间的重叠位置
     * @param that
     * @returns 如果不重叠则抛出异常
     */
    overlap(that: LineRange<T>): LineRange<T>;
}
//# sourceMappingURL=LineRange.d.ts.map