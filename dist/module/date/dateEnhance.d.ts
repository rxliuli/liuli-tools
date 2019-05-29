/**
 * 日期增强
 */
export declare class DateEnhance {
    private date;
    /**
     * 构造函数
     * @param date 要增强的日期
     */
    constructor(date: Date);
    /**
     * 获取到年份
     * @returns
     */
    year(): number;
    /**
     * 获取月份
     * @returns
     * @deprecated 已废弃，请使用 {@link this#monthOfYear} 函数
     */
    month(): number;
    /**
     * 获取今年的第几个月份
     * 和 {@link this#month} 不同的是不再从 0 计算月份
     */
    monthOfYear(): number;
    /**
     * 获取一年内的第多少天
     * 注: 这个天数指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
     * @returns
     */
    dayOfYear(): number;
    /**
     * 获取一个月内的第多少天
     * 注: 这个天数指的是在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
     * @returns
     */
    dayOfMonth(): number;
    /**
     * 获取一个星期内的第多少天
     * @returns
     */
    dayOfWeek(): number;
    /**
     * 获取一年内的第多少星期
     * 注: 这个星期指定的在第几天而非过去了多少天，例如 2018-01-10 的结果会是 10
     * @returns
     */
    weekOfYear(): number;
    /**
     * 获取一个月内的第多少星期
     * @returns
     */
    weekOfMonth(): number;
    /**
     * 获取季度
     * @returns
     */
    quarter(): number;
    /**
     * 获取小时
     * @returns
     */
    hour(): number;
    /**
     * 获取分钟
     * @returns
     */
    minute(): number;
    /**
     * 获取秒
     * @returns
     */
    second(): number;
    /**
     * 获取毫秒
     * @returns
     */
    milliSecond(): number;
}
/**
 * 获取一个增强的日期
 * @param date 要增强的日期
 * @returns 增强日期
 */
export declare function dateEnhance(date: Date): DateEnhance;
//# sourceMappingURL=dateEnhance.d.ts.map