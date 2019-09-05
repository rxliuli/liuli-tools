import { ReturnFunc } from '../interface/ReturnFunc';
/**
 * 谓词的返回值，支持异步函数
 */
declare type PredicateReturn = boolean | Promise<boolean>;
/**
 * 谓词函数的类型
 */
declare type PredicateFunc = ReturnFunc<PredicateReturn>;
/**
 * 连接谓词函数
 */
export declare class CombinedPredicate {
    /**
     * 使用 && 进行连接
     * @param fns 连接任意多个谓词
     * @returns 连接后的新谓词
     */
    static and(...fns: PredicateFunc[]): (...args: any[]) => PredicateReturn;
    /**
     * 使用 || 进行连接
     * @param fns 连接任意多个谓词
     * @returns 连接后的新谓词
     */
    static or(...fns: PredicateFunc[]): (...args: any[]) => PredicateReturn;
    /**
     * 对谓词进行取反
     * @param fn 谓词
     * @returns 取反后的谓词
     */
    static not(fn: PredicateFunc): ReturnFunc<PredicateReturn>;
}
export declare const and: typeof CombinedPredicate.and;
export declare const or: typeof CombinedPredicate.or;
export declare const not: typeof CombinedPredicate.not;
export {};
//# sourceMappingURL=CombinedPredicate.d.ts.map