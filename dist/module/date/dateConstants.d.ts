/**
 * 日期固定时间点
 */
export declare class DateConstants {
    /**
     * 获取指定日期一天的开始时间
     * @param date 指定的时间，默认为当前日期
     * @returns 一天的开始时间
     */
    dayStart(date?: Date): Date;
    /**
     * 获取指定日期一天的结束时间
     * @param date 指定的时间，默认为当前日期
     * @returns 一天的结束时间
     */
    dayEnd(date?: Date): Date;
    /**
     * 获取指定日期所在年份的新年开始时间
     * @param date 指定的时间，默认为当前日期
     * @returns 新年开始时间
     */
    yearStart(date?: Date): Date;
    /**
     * 获取指定日期所在年份的旧年结束时间
     * @param date 指定的时间，默认为当前日期
     * @returns 旧年结束时间
     */
    yearEnd(date?: Date): Date;
}
/**
 * 导出一个日期固定时间点的对象
 */
export declare const dateConstants: DateConstants;
//# sourceMappingURL=dateConstants.d.ts.map