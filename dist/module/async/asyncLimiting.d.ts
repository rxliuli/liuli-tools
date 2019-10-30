import { AsyncFunc } from '../interface/AsyncFunc';
/**
 * 异步限制并发队列的接口
 * 主要适用于限制某个函数的并发限制
 */
interface IAsyncLimiting {
    /**
     * 限制同时存在的异步的数量
     */
    limit: number;
}
/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param fn 异步函数
 * @param options 可选参数
 * @param options.limit 并发限制数量，默认为 1
 * @returns 返回被包装后的限制并发功能的函数
 */
export declare function asyncLimiting<Fn extends AsyncFunc>(fn: Fn, { limit }?: Partial<IAsyncLimiting>): Fn;
export {};
//# sourceMappingURL=asyncLimiting.d.ts.map