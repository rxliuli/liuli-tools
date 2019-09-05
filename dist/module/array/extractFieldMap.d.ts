/**
 * 提取对象数组为 Map
 * @param arr 对象数组
 * @param fields 提取的字段
 * @returns 提取字段名对应其字段值数组的 Map
 * @typeparam T 数组元素的类型，必须为可提取字段的对象
 */
export declare function extractFieldMap<T extends object>(arr: T[], fields: PropertyKey[]): Map<string | number | symbol, any[]>;
//# sourceMappingURL=extractFieldMap.d.ts.map