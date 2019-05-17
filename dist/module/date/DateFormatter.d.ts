/**
 * 日期格式化器
 * 包含格式化为字符串和解析字符串为日期的函数
 */
export declare class DateFormatter {
    /**
     * 构造函数
     * @param {String} fmt 日期时间格式
     */
    constructor(fmt: any);
    /**
     * 格式化
     * @param {Date} date 需要格式化的日期
     * @returns {String} 格式化的字符串
     */
    format(date: any): any;
    /**
     * 解析
     * @param {String} str 字符串
     * @returns {Date} 解析得到的日期
     */
    parse(str: any): Date | null;
    /**
     * 将日期时间字符串转换为前端指定格式的字符串
     * 主要适用场景是前端接收到后端的日期时间一般是一个字符串，然而需要自定义格式的时候还必须先创建 {@link Date} 对象才能格式化，略微繁琐，故使用该函数
     * @param {String} str 字符串
     * @param {String} [parseFmt=undefined] 解析的日期时间格式。默认直接使用 {@link new Date()} 创建
     * @returns {String} 转换后得到的字符串
     */
    strFormat(str: any, parseFmt: any): any;
}
//# sourceMappingURL=DateFormatter.d.ts.map