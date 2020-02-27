/**
 * 桥接对象不存在的字段
 * @param map 代理的字段映射 Map
 * @returns 转换一个对象为代理对象
 * @typeparam 类型解释：1. -readonly 是将使用者的 as const 修改为可变的字段，2. [P in keyof M] 从映射对象中取出所有的 key 作为字段，3. T[M[P] extends keyof T ? M[P] : never] 本质上只是 T[M[P]]]，只是 ts 不认为 M[P] 是 T 的字段，所以只能绕一下才能使用
 */
export declare function bridge<M extends object>(map: M): <T extends object>(obj: T) => T & {
    -readonly [P in keyof M]: T[M[P] extends keyof T ? M[P] : never];
};
//# sourceMappingURL=bridge.d.ts.map