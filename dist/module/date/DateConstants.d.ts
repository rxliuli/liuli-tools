/**
 * 日期固定时间点
 */
export declare class DateConstants {
    /**
     * 获取指定日期一天的开始时间
     * @param date 指定的时间，默认为当前日期
     * @returns 一天的开始时间
     */
    static dayStart(date?: Date): Date;
    /**
     * 获取指定日期一天的结束时间
     * @param date 指定的时间，默认为当前日期
     * @returns 一天的结束时间
     */
    static dayEnd(date?: Date): Date;
    /**
     * 获取指定日期所在月的开始时间
     * @param date 指定的时间，默认为当前日期
     * @returns 月的开始时间
     */
    static monthStart(date?: Date): Date;
    /**
     * 获取指定日期所在月的结束时间
     * @param date 指定的时间，默认为当前日期
     * @returns 月的结束时间
     */
    static monthEnd(date?: Date): Date;
    /**
     * 获取指定日期所在年份的新年开始时间
     * @param date 指定的时间，默认为当前日期
     * @returns 新年开始时间
     */
    static yearStart(date?: Date): Date;
    /**
     * 获取指定日期所在年份的旧年结束时间
     * @param date 指定的时间，默认为当前日期
     * @returns 旧年结束时间
     */
    static yearEnd(date?: Date): Date;
}
/**
 * 导出一个日期固定时间点的对象
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export declare const dateConstants: typeof DateConstants;
//# sourceMappingURL=DateConstants.d.ts.map