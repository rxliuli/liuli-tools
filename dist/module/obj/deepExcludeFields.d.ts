/**
 * 递归排除对象中的指定字段
 * @param obj 需要排除的对象
 * @param  {...obj} fields 需要排除的字段
 */
export declare function deepExcludeFields<T extends object>(obj: T, ...fields: PropertyKey[]): T;
//# sourceMappingURL=deepExcludeFields.d.ts.map