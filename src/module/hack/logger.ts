import { emptyFunc } from '../function/emptyFunc'
import { antiDebug } from './AntiDebug'
import { returnItself } from '../function/returnItself'

/**
 * 自定义的日志类
 * 与浏览器默认的 {@see console} 拥有着完全相同的函数列表，唯一一点区别是包含了一个全局开关用于控制是否输出日志
 */
export class Logger {
  /**
   * 是否开启日志
   */
  private _enable!: boolean
  /**
   * 重置函数
   */
  private reset: Function = returnItself
  /**
   * 构造函数
   * @param options 可选项
   * @param options.enable 是否开启日志
   */
  constructor({ enable = true } = {}) {
    this.enable = enable
  }

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
  /**
   * 获取当前是否开启日志
   */
  public get enable() {
    return this._enable
  }
  /**
   * 替代原生的 {@link console.log}
   * 虽然这里只写了一个 log，但事实上 {@link console} 所有的函数都存在
   * @param message 打印的消息
   * @param optionalParams 其他参数
   * @abstract
   */
  public log(message: object, ...optionalParams: any[]) {}
}

/**
 * 导出一个全局可用的 Logger 对象
 * 使用 enable 属性控制是否开启日志输出，默认为 true
 */
export const logger = new Logger()
