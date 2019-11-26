/**
 * 递归排除对象中的指定字段
 * @param obj 需要排除的对象
 * @param  {...obj} fields 需要排除的字段
 * @deprecated 已废弃，请使用统一使用 `deep` 开头的 {@link deepExcludeFields} 函数
 */
export declare function excludeFieldsDeep<T extends object>(obj: T, ...fields: PropertyKey[]): T;
//# sourceMappingURL=excludeFieldsDeep.d.ts.map