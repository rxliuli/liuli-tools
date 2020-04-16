import { emptyFunc } from '../function/emptyFunc'

enum LoggerLevelEnum {
  Debug = 0,
  Log,
  Info,
  Warn,
  Error,
}

const enumMap: Partial<Record<keyof typeof console, LoggerLevelEnum>> = {
  debug: LoggerLevelEnum.Debug,
  log: LoggerLevelEnum.Log,
  info: LoggerLevelEnum.Info,
  warn: LoggerLevelEnum.Warn,
  error: LoggerLevelEnum.Error,
}

/**
 * 自定义的日志类
 * 主要便于在开发环境下正常显示调试信息，在生产环境则默认关闭它
 */
export class Logger {
  static Level = LoggerLevelEnum
  /**
   * 设置 enable 的 setter 属性，在改变时合并对应的子类对象实现
   * @param enable 是否开启
   */
  set enable(enable: boolean) {
    /**
     * @field 是否开启全局控制台，该属性只写
     */
    ;(Object.keys(console) as (keyof typeof console)[]).forEach(k =>
      Reflect.set(this, k, enable ? console[k] : emptyFunc),
    )
  }

  /**
   * 设置日志的级别
   * @param level
   */
  set level(level: LoggerLevelEnum) {
    ;(Object.keys(console) as (keyof typeof console)[])
      .filter(k => Reflect.has(enumMap, k))
      .forEach(k =>
        Reflect.set(
          this,
          k,
          Reflect.get(enumMap, k) >= level ? console[k] : emptyFunc,
        ),
      )
  }

  /**
   * 开发日志：业务强相关调试日志，希望其他人开发时默认隐藏起来的日志（例如第三方服务的回调日志很多，但对于服务接入层的使用者并不关心）
   */
  debug = console.debug
  /**
   * 开发日志：业务相关调试日志，希望其他开发时也能看到的日志
   */
  log = console.log
  /**
   * 生产日志：开发环境也会打印的日志，希望在生产环境打印并且方便调试的日志
   */
  info = console.info
  /**
   * 警告日志：一些危险的操作可以在这里打印出来，同时会显示在生产环境（例如警告用户不要在控制台输入不了解的代码以避免账号安全）
   */
  warn = console.warn
  /**
   * 错误日志：发生错误时使用的日志，发生影响到用户的错误时必须使用该日志
   */
  error = console.error

  dir = console.dir
  dirxml = console.dirxml
  table = console.table
  trace = console.trace
  group = console.group
  groupCollapsed = console.groupCollapsed
  groupEnd = console.groupEnd
  clear = console.clear
  count = console.count
  assert = console.assert
  profile = console.profile
  profileEnd = console.profileEnd
  time = console.time
  timeEnd = console.timeEnd
  timeStamp = console.timeStamp

  /**
   * 构造函数
   * @param options 可选项
   * @param options.enable 是否开启日志
   */
  constructor(
    {
      enable = true,
      level = LoggerLevelEnum.Log,
    }: Pick<Logger, 'enable' | 'level'> = {} as any,
  ) {
    this.enable = enable
    this.level = level
  }
}

/**
 * 导出一个全局可用的 Logger 对象
 * 使用 enable 属性控制是否开启日志输出，默认为 true
 */
export const logger = new Logger()
