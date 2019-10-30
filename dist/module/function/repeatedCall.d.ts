import { Func } from '../interface/Func';
/**
 * 重复执行指定的函数
 * @param num 重复的次数
 * @param fn 执行的函数，如果是异步函数，则返回 Array.<Promise>
 * @param  {...Object} args 参数
 * @returns 执行返回结果
 */
export declare function repeatedCall<Fn extends Func>(num: number, fn: Fn, ...args: Parameters<Fn>): ReturnType<Fn>[];
//# sourceMappingURL=repeatedCall.d.ts.map