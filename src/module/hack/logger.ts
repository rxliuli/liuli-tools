import { emptyFunc } from '../function/emptyFunc'

/**
 * 自定义的日志类
 * 主要便于在开发环境下正常显示调试信息，在生产环境则默认关闭它
 */
export class Logger {
  /**
   * 设置 enable 的 setter 属性，在改变时合并对应的子类对象实现
   * @param enable 是否开启
   */
  public set enable(enable: boolean) {
    /**
     * @field 是否开启全局控制台，该属性只写
     */
    this._enable = enable
    Object.keys(console).forEach(
      // @ts-ignore
      k => (this[k] = enable ? console[k] : emptyFunc),
    )
  }
  public debug = console.debug
  public error = console.error
  public info = console.info
  public log = console.log
  public warn = console.warn
  public dir = console.dir
  public dirxml = console.dirxml
  public table = console.table
  public trace = console.trace
  public group = console.group
  public groupCollapsed = console.groupCollapsed
  public groupEnd = console.groupEnd
  public clear = console.clear
  public count = console.count
  public assert = console.assert
  public profile = console.profile
  public profileEnd = console.profileEnd
  public time = console.time
  public timeEnd = console.timeEnd
  public timeStamp = console.timeStamp
  /**
   * 是否开启日志
   */
  private _enable: boolean
  /**
   * 构造函数
   * @param options 可选项
   * @param options.enable 是否开启日志
   */
  constructor({ enable = true } = {}) {
    this._enable = enable
  }
}

/**
 * 导出一个全局可用的 Logger 对象
 * 使用 enable 属性控制是否开启日志输出，默认为 true
 */
export const logger = new Logger()
