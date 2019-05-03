import { timing } from '../function/timing'

export const antiDebug = {
  /**
   * 不停循环 debugger 防止有人调试代码
   */
  cyclingDebugger () {
    setInterval(() => {
      // eslint-disable-next-line no-debugger
      debugger
    }, 100)
  },

  /**
   * 检查是否正在 debugger 并调用回调函数
   * @param {Function} fn 回调函数，默认为重载页面
   */
  checkDebug (fn = () => window.location.reload()) {
    setInterval(() => {
      const diff = timing(() => {
        for (let i = 0; i < 1000; i++) {
          console.log(i)
          console.clear()
        }
      })
      if (diff > 2000) {
        fn()
      }
    }, 1000)
  },

  /**
   * 禁用控制台调试输出
   */
  disableConsoleOutput () {
    if (!window.console) {
      // @ts-ignore
      window.console = {}
    }
    const methods = [
      'log',
      'debug',
      'warn',
      'info',
      'dir',
      'dirxml',
      'trace',
      'profile',
    ]
    for (var i = 0; i < methods.length; i++) {
      console[methods[i]] = function () {}
    }
  },
}
