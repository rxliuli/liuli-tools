import { Nullable } from '../interface/Nullable';
/**
 * 解析字符串为 Date 对象
 * @param str 日期字符串
 * @param fmt 日期字符串的格式，目前仅支持使用 y(年),M(月),d(日),h(时),m(分),s(秒),S(毫秒)
 * @returns 解析得到的 Date 对象
 */
export declare function dateParse(str: string, fmt: string): Nullable<Date>;
//# sourceMappingURL=dateParse.d.ts.map