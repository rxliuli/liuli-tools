/**
 * 合并多个对象的属性
 * 1. 该合并的方式为浅层合并，只会合并一层的对象
 * 2. 默认忽略值为 undefined/null 的属性
 * @param target 覆盖的对象上
 * @param  {...Object} sources 任意数量的对象
 * @returns 合并后的对象
 */
export declare function assign<T extends object>(target: T | null | undefined, ...sources: Array<any | null | undefined>): any;
//# sourceMappingURL=assign.d.ts.map