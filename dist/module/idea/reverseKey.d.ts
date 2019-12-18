/**
 * 反转对象的 key/value
 * 主要适用场景是反向根据字段值查询字段名，一般用于反转常量
 * 注: 对象中的 value 必须是 {@type PropertyKey} 类型
 * 注: 如果存在值相同的字段，则根据浏览器的 `Object.keys` 函数获取到的顺序进行覆盖
 * @param obj 需要反转的对象
 * @returns 反转得到的对象
 */
export declare function reverseKeyValue<K extends PropertyKey, V extends PropertyKey>(obj: Record<K, V>): Record<V, K>;
//# sourceMappingURL=reverseKey.d.ts.map