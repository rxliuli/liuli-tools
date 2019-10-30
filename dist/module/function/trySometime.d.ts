import { PromiseDeconstruct } from '../interface/PromiseDeconstruct';
/**
 * 包装一个函数为有错误重试功能的函数
 * 注: 如果发生错误，最终将抛出最后一次调用的异常
 * @param fn 需要被包装的函数
 * @param num 调用的次数。默认为 1
 * @param errorCheck 检查返回结果是否需要重试的函数。默认只要 resolve() 就返回 true
 * @returns 包装后的有错误重试功能的函数
 */
export declare function trySometime<Fn extends (...args: any[]) => any>(fn: Fn, num?: number, errorCheck?: (res: PromiseDeconstruct<ReturnType<Fn>>) => boolean): Fn;
//# sourceMappingURL=trySometime.d.ts.map