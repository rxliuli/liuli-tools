import { ReturnFunc } from '../interface/ReturnFunc';
/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param fn 需要测试的函数
 * @returns 执行的毫秒数
 */
export declare function timing<R>(fn: ReturnFunc<R>): R extends Promise<any> ? Promise<number> : number;
//# sourceMappingURL=timing.d.ts.map