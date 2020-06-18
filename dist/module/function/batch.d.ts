import { Func, DeconstructionPromise } from 'liuli-types';
/**
 * 将多个并发异步调用合并为一次批处理
 * @param fn 需要包装的函数
 * @param handle 批处理的函数
 */
export declare function batch<T extends Func, P extends Parameters<T>, R extends DeconstructionPromise<ReturnType<T>>>(fn: T, handle: (args: P[]) => Promise<Map<P, R>>): T;
//# sourceMappingURL=batch.d.ts.map