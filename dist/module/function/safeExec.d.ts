import { ReturnFunc } from '../interface/ReturnFunc';
/**
 * 安全执行某个函数
 * @param fn 需要执行的函数
 * @param defaultVal 发生异常后的默认返回值，默认为 null
 * @param args 可选的函数参数
 * @returns 函数执行的结果，或者其默认值
 */
export declare function safeExec<R>(fn: ReturnFunc<R>, defaultVal?: R | null, ...args: any[]): R | null;
//# sourceMappingURL=safeExec.d.ts.map