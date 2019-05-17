/**
 * 时间日期间隔
 * @class DateBetween
 */
export declare class DateBetween {
    /**
     * 构造函数
     * @param {Date} start 开始时间
     * @param {Date} end 结束时间
     */
    constructor(start: any, end: any);
    /**
     * 获取毫秒差值
     * @returns {Number} 毫秒差值
     */
    milliSecond(): number;
    /**
     * 获取秒差值
     * @returns {Number} 秒差值
     */
    second(): number;
    /**
     * 获取分钟差值
     * @returns {Number} 分钟差值
     */
    minute(): number;
    /**
     * 获取小时差值
     * @returns {Number} 小时差值
     */
    hour(): number;
    /**
     * 获取天数差值
     * @returns {Number} 天数差值
     */
    day(): number;
    /**
     * 获取月份差值
     * 注: 此处获取的差值是按月计算的，即 2018-12-31 => 2019-01-01 也被认为相差一个月
     * @returns {Number} 月份差值
     */
    month(): number;
    /**
     * 获取年份差值
     * 注: 此处获取的差值是按年计算的，即 2018-12-31 => 2019-01-01 也被认为相差一年
     * @returns {Number} 年份差值
     */
    year(): number;
}
/**
 * 获取两个时间的差值
 * @param {Date} start 开始时间
 * @param {Date} end 结束时间
 * @returns {DateBetween} 差值对象
 */
export declare function dateBetween(start: any, end: any): DateBetween;
//# sourceMappingURL=dateBetween.d.ts.map