import { ReturnFunc } from '../interface/ReturnFunc';
/**
 * 将指定函数包装为只调用一次，其他的调用返回旧值
 * 主要适用场景是只允许调用一次的地方，例如 Tab 的初始化
 * * 示意图:
 * a => b => c => d => e =>
 * a ==|====|====|====|====>
 *     |b   |c   |d   |e  (die)
 *
 * @param fn 需要包装的函数
 * @returns 包装后的函数
 */
export declare function once<R, Fn extends ReturnFunc<R>>(fn: Fn): Fn & {
    origin: Fn;
    clear: () => void;
};
//# sourceMappingURL=once.d.ts.map