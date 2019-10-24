import { ReturnFunc } from '../interface/ReturnFunc'
import { Func } from '../interface/Func'
import { Nullable } from '../interface/Nullable'

/**
 * 安全执行某个函数
 * @param fn 需要执行的函数
 * @param defaultVal 发生异常后的默认返回值，默认为 null
 * @param args 可选的函数参数
 * @returns 函数执行的结果，或者其默认值
 */
export function safeExec<Fn extends Func, R extends Nullable<ReturnType<Fn>>>(
  fn: Fn,
  defaultVal?: R,
  ...args: Parameters<Fn>
): R extends Nullable<ReturnType<Fn>>
  ? Nullable<ReturnType<Fn>>
  : ReturnType<Fn> {
  try {
    return fn(...(args as any))
  } catch (err) {
    return (defaultVal === undefined ? null : defaultVal) as any
  }
}
