/**
 * 桥接对象不存在的字段
 * @param map 代理的字段映射 Map
 * @returns 转换一个对象为代理对象
 */
export declare function bridge<T extends object, M extends object = Record<PropertyKey, PropertyKey>, K extends keyof M = any, R = T & Record<K, any>>(map: M): (obj: T) => R;
//# sourceMappingURL=bridge.d.ts.map