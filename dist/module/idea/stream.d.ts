declare class Stream<T> {
    private arr;
    private taskList;
    constructor(arr: T[]);
    filter(fn: (val: T) => boolean): this;
    map<U>(fn: (val: T) => U): Stream<U>;
    value(): T[];
}
/**
 * 将一个数组变成一个流，所有关于流的操作都是延迟的
 */
export declare function stream<T>(arr: T[]): Stream<T>;
export {};
//# sourceMappingURL=stream.d.ts.map