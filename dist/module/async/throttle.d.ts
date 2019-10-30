import { Func } from '../interface/Func';
import { Async } from '../interface/Async';
/**
 * 函数节流
 * 节流 (throttle) 让一个函数不要执行的太频繁，减少执行过快的调用，叫节流
 * 类似于上面而又不同于上面的函数去抖, 包装后函数在上一次操作执行过去了最小间隔时间后会直接执行, 否则会忽略该次操作
 * 与上面函数去抖的明显区别在连续操作时会按照最小间隔时间循环执行操作, 而非仅执行最后一次操作
 * 注: 该函数第一次调用一定会执行，不需要担心第一次拿不到缓存值，后面的连续调用都会拿到上一次的缓存值
 * 注: 返回函数结果的高阶函数需要使用 {@see Proxy} 实现，以避免原函数原型链上的信息丢失
 *
 * @param delay 最小间隔时间，单位为 ms
 * @param action 真正需要执行的操作
 * @return {Function} 包装后有节流功能的函数。该函数是异步的，与需要包装的函数 {@link action} 是否异步没有太大关联
 */
export declare function throttle<Fn extends Func>(delay: number, action: Fn): Async<Fn>;
//# sourceMappingURL=throttle.d.ts.map