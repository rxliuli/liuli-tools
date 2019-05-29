import { ReturnFunc } from '../interface/ReturnFunc';
/**
 * 重复执行指定的函数
 * @param num 重复的次数
 * @param fn 执行的函数，如果是异步函数，则返回 Array.<Promise>
 * @param  {...Object} args 参数
 * @returns 执行返回结果
 */
export declare function repeatedCall<R>(num: number, fn: ReturnFunc<R>, ...args: any[]): R[];
//# sourceMappingURL=repeatedCall.d.ts.map