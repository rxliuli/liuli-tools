/**
 * Locker 初始化对象接口
 */
interface ILockerInit {
    limit?: number;
    timeout?: number;
}
/**
 * 创建一个 Lock 对象，用于锁住当前的当前的异步流程
 */
export declare class Locker {
    /**
     * 限制并发数量，默认为 1
     */
    limit: number;
    /**
     * 超时时间，默认为无限
     */
    timeout: number;
    /**
     * @param options 可选项
     * @param options.limit 限制并发数量，默认为 1
     * @param options.timeout 超时时间，默认为无限
     */
    constructor({ limit, timeout }?: Partial<ILockerInit>);
    /**
     * 当前是否锁住了
     * @returns 是否锁住了
     */
    isLocked(): boolean;
    /**
     * 添加异步锁
     * @param timeout 超时时间，默认为全局 timeout
     * @returns 进行等待
     */
    lock(timeout?: number): Promise<void>;
    /**
     * 删除异步锁
     */
    unlock(): void;
}
export {};
//# sourceMappingURL=Locker.d.ts.map