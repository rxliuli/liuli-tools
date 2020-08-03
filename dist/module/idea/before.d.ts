import { Func } from 'liuli-types';
/**
 * 在函数之前插入一个新的函数
 * @param fn
 * @param handle
 */
export declare function before<F extends Func>(fn: F, handle: (origin: F, ...args: Parameters<F>) => ReturnType<F>): (...args: Parameters<F>) => ReturnType<F>;
//# sourceMappingURL=before.d.ts.map