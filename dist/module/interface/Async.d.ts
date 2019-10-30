import { Func } from './Func';
export declare type PromiseConstruct<T> = T extends Promise<any> ? T : Promise<T>;
/**
 * 将函数变为异步函数
 */
export declare type Async<Fn extends Func> = (...args: Parameters<Fn>) => PromiseConstruct<ReturnType<Fn>>;
//# sourceMappingURL=Async.d.ts.map