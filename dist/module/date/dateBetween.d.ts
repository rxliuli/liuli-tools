/**
 * 时间日期间隔
 */
export declare class DateBetween {
    private start;
    private end;
    /**
     * 构造函数
     * @param start 开始时间
     * @param end 结束时间
     */
    constructor(start: Date, end: Date);
    /**
     * 获取毫秒差值
     * @returns 毫秒差值
     */
    milliSecond(): number;
    /**
     * 获取秒差值
     * @returns 秒差值
     */
    second(): number;
    /**
     * 获取分钟差值
     * @returns 分钟差值
     */
    minute(): number;
    /**
     * 获取小时差值
     * @returns 小时差值
     */
    hour(): number;
    /**
     * 获取天数差值
     * @returns 天数差值
     */
    day(): number;
    /**
     * 获取月份差值
     * 注: 此处获取的差值是按月计算的，即 2018-12-31 => 2019-01-01 也被认为相差一个月
     * @returns 月份差值
     */
    month(): number;
    /**
     * 获取年份差值
     * 注: 此处获取的差值是按年计算的，即 2018-12-31 => 2019-01-01 也被认为相差一年
     * @returns 年份差值
     */
    year(): number;
}
/**
 * 获取两个时间的差值
 * @param start 开始时间
 * @param end 结束时间
 * @returns 差值对象
 */
export declare function dateBetween(start: Date, end: Date): DateBetween;
//# sourceMappingURL=dateBetween.d.ts.map