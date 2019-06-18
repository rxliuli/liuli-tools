import { PredicateFunc } from '../interface/PredicateFunc';
/**
 * 将一个谓词函数取反
 * 如果是同步函数，则返回的函数也是同步的，否则返回的是取反后的异步函数
 * @param fn 要取反的函数
 * @returns 取反得到的函数
 * @deprecated 已废弃，请使用 {@link CombinedPredicate.not} 进行为此取反
 */
export declare function deny(fn: PredicateFunc): PredicateFunc;
//# sourceMappingURL=deny.d.ts.map