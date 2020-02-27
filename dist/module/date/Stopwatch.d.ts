/**
 * 秒表
 * 标准格式 `HH:mm:ss`
 * 主要适用场景是格式化/解析时间差值
 */
export declare class Stopwatch {
    /**
     * 格式化一个以秒为单位的绝对时间为标准时间格式的字符串
     * @param time 时间/s
     * @returns 格式化后的字符串
     */
    static format(time: number): string;
    /**
     * 解析一个标准的时间字符串为秒为单位的绝对时间
     * @param str 时间字符串
     * @returns 解析得到的时间/s
     */
    static parse(str: string): number;
}
//# sourceMappingURL=Stopwatch.d.ts.map