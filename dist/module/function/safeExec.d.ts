import { Func } from '../interface/Func';
import { Nullable } from '../interface/Nullable';
import { PromiseDeconstruct } from '../interface/PromiseDeconstruct';
/**
 * 安全执行某个函数
 * 支持异步函数
 * @param fn 需要执行的函数
 * @param defaultVal 发生异常后的默认返回值，默认为 null
 * @param args 可选的函数参数
 * @returns 函数执行的结果，或者其默认值
 */
export declare function safeExec<Fn extends Func>(fn: Fn, defaultVal?: ReturnType<Fn>, ...args: Parameters<Fn>): Nullable<PromiseDeconstruct<ReturnType<Fn>>>;
//# sourceMappingURL=safeExec.d.ts.map