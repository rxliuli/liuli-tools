import { timing } from '../function/timing'
import { emptyFunc } from '../function/emptyFunc'
import { returnItself } from '../function/returnItself'
import { arrayToMap } from '../array/arrayToMap'
import { EmptyFunc } from '../interface/EmptyFunc'

/**
 * 禁止他人调试网站相关方法的集合对象
 */
export class AntiDebug {
  /**
   * 不停循环 debugger 防止有人调试代码
   * @returns 取消函数
   */
  public static cyclingDebugger(): EmptyFunc {
    const res = setInterval(() => {
      debugger
    }, 100)
    return () => clearInterval(res)
  }

  /**
   * 检查是否正在 debugger 并调用回调函数
   * @param fn 回调函数，默认为重载页面
   * @returns 取消函数
   */
  public static checkDebug(
    fn: Function = () => window.location.reload(),
  ): EmptyFunc {
    const res = setInterval(() => {
      const diff = timing(() => {
        debugger
      })
      if (diff > 500) {
        console.log(diff)
        fn()
      }
    }, 1000)
    return () => clearInterval(res)
  }

  /**
   * 禁用控制台调试输出
   * @returns 取消函数
   */
  public static disableConsoleOutput(): EmptyFunc {
    if (!window.console) {
      return emptyFunc
    }
    const map = arrayToMap(Object.keys(console), returnItself, k => {
      // @ts-ignore
      const temp = console[k]
      // @ts-ignore
      console[k] = emptyFunc
      return temp
    })
    return () => {
      for (const [k, v] of map) {
        // @ts-ignore
        console[k] = v
      }
    }
  }
}
/**
 * 禁止他人调试网站相关方法的集合对象
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export const antiDebug = AntiDebug
