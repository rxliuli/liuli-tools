import { Func } from 'liuli-types';
/**
 * 在函数周围添加前置/后置函数
 * @param fn
 * @param handle
 */
export declare function around<F extends Func, R1, R2>(fn: F, handle: (next: F, ...args: Parameters<F>) => R1): (...args: Parameters<F>) => R1;
//# sourceMappingURL=around.d.ts.map