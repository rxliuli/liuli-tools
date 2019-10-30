declare const Change: unique symbol;
declare const Path: unique symbol;
declare type PeekObject<T extends object> = T & {
    [Change]: Map<PropertyKey[], any>;
    [Path]?: PropertyKey[];
};
/**
 * 记录对象的修改
 * 1. 传入一个对象
 * 2. 使用代理监听所有的操作
 * 3. 如果是获取对象类型的属性，则为该属性添加同样的代理
 * 4. 如果设置对象的属性，则记录本次修改的值
 * 5. 根据所有修改的值构建一个新的对象
 * @param obj 需要修改的对象
 * @returns 能够记录修改的对象
 */
export declare class Peek {
    constructor();
    peek<T extends object>(obj: T): PeekObject<T>;
    /**
     * 计算修改的属性
     * @param obj 监听修改的对象
     * @returns 修改的部分
     */
    compute<T extends PeekObject<object>>(obj: T): T;
    /**
     * 重置该对象的修改属性
     */
    reset(obj: PeekObject<object>): void;
}
export declare const peekInstance: Peek;
export {};
//# sourceMappingURL=Peek.d.ts.map