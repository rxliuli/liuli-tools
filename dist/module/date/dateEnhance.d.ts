/**
 * 日期增强
 */
export declare class DateEnhance {
    /**
     * 构造函数
     * @param {Date} date 要增强的日期
     */
    constructor(date: any);
    /**
     * 获取到年份
     * @returns {Number}
     */
    year(): any;
    /**
     * 获取月份
     * @returns {Number}
     * @deprecated 已废弃，请使用 {@link this#monthOfYear} 函数
     */
    month(): any;
    /**
     * 获取今年的第几个月份
     * 和 {@link this#month} 不同的是不再从 0 计算月份
     */
    monthOfYear(): any;
    /**
     * 获取一年内的第多少天
     * 注: 这个天数指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
     * @returns {Number}
     */
    dayOfYear(): number;
    /**
     * 获取一个月内的第多少天
     * 注: 这个天数指的是在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
     * @returns {Number}
     */
    dayOfMonth(): any;
    /**
     * 获取一个星期内的第多少天
     * @returns {Number}
     */
    dayOfWeek(): any;
    /**
     * 获取一年内的第多少星期
     * 注: 这个星期指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
     * @returns {Number}
     */
    weekOfYear(): number;
    /**
     * 获取一个月内的第多少星期
     * @returns {Number}
     */
    weekOfMonth(): number;
    /**
     * 获取季度
     * @returns {Number}
     */
    quarter(): 1 | 2 | 3 | 4;
    /**
     * 获取小时
     * @returns {Number}
     */
    hour(): any;
    /**
     * 获取分钟
     * @returns {Number}
     */
    minute(): any;
    /**
     * 获取秒
     * @returns {Number}
     */
    second(): any;
    /**
     * 获取毫秒
     * @returns {Number}
     */
    milliSecond(): any;
}
/**
 * 获取一个增强的日期
 * @param {Date} date 要增强的日期
 * @returns {DateEnhance} 增强日期
 */
export declare function dateEnhance(date: any): DateEnhance;
//# sourceMappingURL=dateEnhance.d.ts.map