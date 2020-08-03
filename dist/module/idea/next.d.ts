import { Func } from 'liuli-types';
declare type NextFunc = (next: Func, ...args: any[]) => void;
declare type NextChain = Func & {
    next: (next: Func, ...args: any[]) => NextChain;
    nextFn: NextFunc;
};
/**
 * 职责链模式
 * @param fn
 */
export declare function next(fn: NextFunc): NextChain;
export {};
//# sourceMappingURL=next.d.ts.map