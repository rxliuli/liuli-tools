export declare type ObjectEntries<T extends object> = [keyof T, T[keyof T]][];
/**
 * 从一个对象中挑选出来几个指定的字段
 * @param obj 指定对象
 * @param fieldList 指定对象字段列表
 * @returns 返回挑选字段组成的新对象
 */
export declare function pick<T extends object, K extends keyof T>(obj: T, ...fieldList: K[]): Pick<T, K>;
//# sourceMappingURL=pick.d.ts.map