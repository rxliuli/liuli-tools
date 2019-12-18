import { ReturnFunc } from '../interface/ReturnFunc';
interface BaseOnce {
    /**
     * 将指定函数包装为只调用一次，其他的调用返回旧值
     * 主要适用场景是只允许调用一次的地方，例如 Tab 的初始化
     * 本质上 {@link limit} 的特化
     * * 示意图:
     * a => b => c => d => e =>
     * a ==|====|====|====|====>
     *     |b   |c   |d   |e  (die)
     *
     * @param fn 需要包装的函数
     * @returns 包装后的函数
     */
    once<R, Fn extends ReturnFunc<R>>(fn: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
    /**
     * 包装一个函数为只执行指定次数的函数
     * @param fn 需要包装的函数
     * @param max 最大执行次数
     * @returns 包装后的函数
     */
    limit<R, Fn extends ReturnFunc<R>>(fn: Fn, max: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    /**
     * 包装一个函数为指定参数只执行一次的函数
     * @param fn 需要包装的函数
     * @param identity 参数转换的函数，参数为需要包装函数的参数
     * @returns 需要被包装的函数
     */
    onceOfSameParam<Fn extends Function>(fn: Fn, identity?: (...args: any[]) => string): Fn & {
        origin: Fn;
        clear: (...keys: any[]) => void;
    };
    /**
     * 将函数包装为同一时间只能调用一次，其他的调用返回旧值
     * 主要适用场景是同一时间只允许存在一个 UI 调用（弹出层）
     * 示意图:
     * a => b => c => d => e =>
     * a ==|===> c ==|===> e =>
     *     |b        |d     (die)
     *
     * @param func 需要包装的函数
     * @returns 包装后的函数
     */
    onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(func: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
    /**
     * 在固定时间周期内只执行函数一次
     * @param {Function} fn 执行的函数
     * @param {Number} time 时间周期
     * @returns {Function} 包装后的函数
     */
    onceOfCycle<R, Fn extends ReturnFunc<R>>(fn: Fn, time: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
}
/**
 * 抽象的 once 类，用于让 JS Class 进行继承扩展
 */
export declare abstract class BasicOnce implements BaseOnce {
    private className;
    once<R, Fn extends ReturnFunc<R>>(fn: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
    limit<R, Fn extends ReturnFunc<R>>(fn: Fn, max: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfCycle<R, Fn extends ReturnFunc<R>>(fn: Fn, time: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfSameParam<Fn extends Function>(fn: Fn, identity?: (...args: any[]) => string): Fn & {
        origin: Fn;
        clear: (...keys: any[]) => void;
    };
    onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(func: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
}
/**
 * 基于内存的 once 系列函数
 */
declare class RamOnceClass extends BasicOnce {
    once<R, Fn extends ReturnFunc<R>>(fn: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
    limit<R, Fn extends ReturnFunc<R>>(fn: Fn, max: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfSameParam<Fn extends Function>(fn: Fn, identity?: (...args: any[]) => string): Fn & {
        origin: Fn;
        clear: (...keys: any[]) => void;
    };
    onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(fn: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfCycle<R, Fn extends ReturnFunc<R>>(fn: Fn, time: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
}
declare abstract class StorageOnceClass extends BasicOnce {
    private storage;
    protected constructor(storage: Storage);
    once<R, Fn extends ReturnFunc<R>>(fn: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
    limit<R, Fn extends ReturnFunc<R>>(fn: Fn, max: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfCycle<R, Fn extends ReturnFunc<R>>(fn: Fn, time: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfSameParam<Fn extends Function>(fn: Fn, identity?: (...args: any[]) => string): Fn & {
        origin: Fn;
        clear: (...keys: any[]) => void;
    };
    onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(func: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
}
/**
 * 基于 LocalStorage 的 once 系列函数
 */
declare class LocalStorageOnceClass extends StorageOnceClass {
    constructor();
}
/**
 * 基于 SessionStorage 的 once 系列函数
 */
declare class SessionStorageOnceClass extends BasicOnce {
    once<R, Fn extends ReturnFunc<R>>(fn: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
    limit<R, Fn extends ReturnFunc<R>>(fn: Fn, max: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfCycle<R, Fn extends ReturnFunc<R>>(fn: Fn, time: number): Fn & {
        origin: Fn;
        clear: () => void;
    };
    onceOfSameParam<Fn extends Function>(fn: Fn, identity?: (...args: any[]) => string): Fn & {
        origin: Fn;
        clear: (...keys: any[]) => void;
    };
    onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(func: Fn): Fn & {
        origin: Fn;
        clear: () => void;
    };
}
/**
 * 导出的 OnceUtil 实体类
 */
export declare const OnceInstance: {
    RamOnce: RamOnceClass;
    LocalStorageOnce: LocalStorageOnceClass;
    SessionStorageOnce: SessionStorageOnceClass;
};
export {};
//# sourceMappingURL=OnceInstance.d.ts.map