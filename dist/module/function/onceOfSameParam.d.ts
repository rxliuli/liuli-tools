import { BaseMemoryCache } from '../cache/MemoryCache';
import { Func } from 'liuli-types';
/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param fn 需要包装的函数
 * @param identity 参数转换的函数，参数为需要包装函数的参数
 * @param memoryCache
 * @returns 需要被包装的函数
 */
declare function _onceOfSameParam<Fn extends Func>(fn: Fn, identity?: (fn: Func, args: any[]) => string, memoryCache?: BaseMemoryCache<any, any>): Fn & {
    origin: Fn;
    clear: (...keys: any[]) => void;
};
export declare const onceOfSameParam: typeof _onceOfSameParam & {
    identity: (fn: Func, args: any[]) => string;
};
export {};
//# sourceMappingURL=onceOfSameParam.d.ts.map