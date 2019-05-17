/**
 * 创建一个 Lock 对象，用于锁住当前的当前的异步流程
 */
export declare class Locker {
    /**
     * @param {Object} [options={}] 可选项
     * @param {Number} [options.limit=1] 限制并发数量，默认为 1
     * @param {Number|Function} [options.timeout=TimeoutInfinity] 超时时间，默认为无限
     */
    constructor({ limit, timeout }?: {
        limit?: number | undefined;
        timeout?: (() => boolean) | undefined;
    });
    /**
     * 当前是否锁住了
     * @returns {Boolean} 是否锁住了
     */
    isLocked(): boolean;
    /**
     * 添加异步锁
     * @param {Number|Function} [timeout=this.timeout] 超时时间，默认为全局 timeout
     * @returns {Promise} 进行等待
     */
    lock(timeout?: any): Promise<void>;
    /**
     * 删除异步锁
     */
    unlock(): void;
}
//# sourceMappingURL=Locker.d.ts.map