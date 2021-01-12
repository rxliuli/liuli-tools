import { Func } from '../interface/Func'

export function pipe<T, R1>(init: T, f1: (value: T) => R1): R1
export function pipe<T, R1, R2>(
  init: T,
  f1: (value: T) => R1,
  f2: (value: R1) => R2,
): R2
export function pipe<T, R1, R2, R3>(
  init: T,
  f1: (value: T) => R1,
  f2: (value: R1) => R2,
  f3: (value: R2) => R3,
): R3
export function pipe<T, R1, R2, R3, R4>(
  init: T,
  f1: (value: T) => R1,
  f2: (value: R1) => R2,
  f3: (value: R2) => R3,
  f4: (value: R3) => R4,
): R4
export function pipe<T, R1, R2, R3, R4, R5>(
  init: T,
  f1: (value: T) => R1,
  f2: (value: R1) => R2,
  f3: (value: R2) => R3,
  f4: (value: R3) => R4,
  f5: (value: R4) => R5,
): R5
export function pipe<T, R1, R2, R3, R4, R5, R6>(
  init: T,
  f1: (value: T) => R1,
  f2: (value: R1) => R2,
  f3: (value: R2) => R3,
  f4: (value: R3) => R4,
  f5: (value: R4) => R5,
  f6: (value: R5) => R6,
): R6
export function pipe<T, R1, R2, R3, R4, R5, R6, R7>(
  init: T,
  f1: (value: T) => R1,
  f2: (value: R1) => R2,
  f3: (value: R2) => R3,
  f4: (value: R3) => R4,
  f5: (value: R4) => R5,
  f6: (value: R5) => R6,
  f7: (value: R6) => R7,
): R7
/**
 * 拍平嵌套执行函数
 * @param init 初始值
 * @param funcList 函数列表
 * @returns 返回一个函数，参数为第一个函数的参数，结果为最后一个函数的返回值
 */
export function pipe<T, U>(init: T, ...funcList: Func[]): U {
  return funcList.reduce((res, func) => func(res), init) as any
}
