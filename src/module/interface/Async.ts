import { Func } from './Func'

// 如果不是 Promise 就返回 Promise
export type PromiseConstruct<T> = T extends Promise<any> ? T : Promise<T>
/**
 * 将函数变为异步函数
 */
export type Async<Fn extends Func> = (
  ...args: Parameters<Fn>
) => PromiseConstruct<ReturnType<Fn>>
