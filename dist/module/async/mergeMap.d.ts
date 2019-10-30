import { AsyncFunc } from '../interface/AsyncFunc';
/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会按照调用顺序依次返回结果，后面的调用的结果需要等待前面的，所以如果不关心过时的结果，请使用 {@link switchMap} 函数
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
export declare function mergeMap<Fn extends AsyncFunc>(fn: Fn): Fn;
//# sourceMappingURL=mergeMap.d.ts.map