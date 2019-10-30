import { Func } from '../interface/Func';
import { Async } from '../interface/Async';
/**
 * 包装一个函数为异步函数
 * 如果是一个异步函数，则直接返回，否则返回一部函数
 * @param fn 任意一个函数
 * @returns 返回的异步结果 Promise 对象
 * @typeparam R 原函数函数返回值类型
 */
export declare function async<Fn extends Func>(fn: Fn): Async<Fn>;
//# sourceMappingURL=async.d.ts.map