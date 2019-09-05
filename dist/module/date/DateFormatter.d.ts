import { Nullable } from '../interface/Nullable';
/**
 * 日期格式化器
 * 包含格式化为字符串和解析字符串为日期的函数
 */
export declare class DateFormatter {
    private fmt;
    /**
     * 日期格式化器
     */
    static dateFormatter: DateFormatter;
    /**
     * 时间格式化器
     */
    static timeFormatter: DateFormatter;
    /**
     * 日期时间格式化器
     */
    static dateTimeFormatter: DateFormatter;
    /**
     * 构造函数
     * @param fmt 日期时间格式
     */
    constructor(fmt: string);
    /**
     * 格式化
     * @param date 需要格式化的日期
     * @returns 格式化的字符串
     */
    format(date: Date | null): string;
    /**
     * 解析字符串为日期对象
     * @param str 字符串
     * @returns 解析得到的日期
     */
    parse(str: string | null | undefined): Nullable<Date>;
    /**
     * 将日期时间字符串转换为前端指定格式的字符串
     * 主要适用场景是前端接收到后端的日期时间一般是一个字符串，然而需要自定义格式的时候还必须先创建 {@link Date} 对象才能格式化，略微繁琐，故使用该函数
     * @param str 字符串
     * @param parseFmt 解析的日期时间格式。默认直接使用 {@link new Date()} 创建
     * @returns 转换后得到的字符串
     */
    strFormat(str: string | null | undefined, parseFmt?: string): string;
}
//# sourceMappingURL=DateFormatter.d.ts.map