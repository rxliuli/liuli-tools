declare type Predicate = (...args: any[]) => boolean;
interface ILockerInit {
    limit?: number;
    timeout?: number;
}
/**
 * 创建一个 Lock 对象，用于锁住当前的当前的异步流程
 */
export declare class Locker {
    limit: number;
    timeout: number | Predicate;
    /**
     * @param [options={}] 可选项
     * @param [options.limit=1] 限制并发数量，默认为 1
     * @param [options.timeout=TimeoutInfinity] 超时时间，默认为无限
     */
    constructor({ limit, timeout }?: Partial<ILockerInit>);
    /**
     * 当前是否锁住了
     * @returns 是否锁住了
     */
    isLocked(): boolean;
    /**
     * 添加异步锁
     * @param [timeout=this.timeout] 超时时间，默认为全局 timeout
     * @returns 进行等待
     */
    lock(timeout?: number | Predicate): Promise<void>;
    /**
     * 删除异步锁
     */
    unlock(): void;
}
export {};
//# sourceMappingURL=Locker.d.ts.map