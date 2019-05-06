import { emptyFunc } from '../function/emptyFunc'

/**
 * 自定义的日志类
 * 与浏览器默认的 {@link console} 拥有着完全相同的函数列表，唯一一点区别是包含了一个全局开关用于控制是否输出日志
 */
export class Logger {
  /**
   * 构造函数
   * @param {Object} [options] 可选项
   * @param {Boolean} [options.enable] 是否开启日志
   */
  constructor ({ enable = true } = {}) {
    this.enable = enable
  }

  /**
   * 设置 enable 的 setter 属性，在改变时合并对应的子类对象实现
   */
  set enable (enable) {
    this._enable = enable
    Object.keys(console).forEach(
      k => (this[k] = enable ? console[k] : emptyFunc)
    )
  }
  /**
   * 替代原生的 {@link console.log}
   * 虽然这里只写了一个 log，但事实上 {@link console} 所有的函数都存在
   * @param {Object} message 打印的消息
   * @param {Array.<Object>} optionalParams 其他参数
   * @abstract
   */
  log (message, ...optionalParams) {}
}

export const logger = new Logger()
