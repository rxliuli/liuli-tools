declare enum LoggerLevelEnum {
    Debug = 0,
    Log = 1,
    Info = 2,
    Warn = 3,
    Error = 4
}
/**
 * 自定义的日志类
 * 主要便于在开发环境下正常显示调试信息，在生产环境则默认关闭它
 */
export declare class Logger {
    static Level: typeof LoggerLevelEnum;
    /**
     * 设置 enable 的 setter 属性，在改变时合并对应的子类对象实现
     * @param enable 是否开启
     */
    set enable(enable: boolean);
    /**
     * 设置日志的级别
     * @param level
     */
    set level(level: LoggerLevelEnum);
    /**
     * 开发日志：业务强相关调试日志，希望其他人开发时默认隐藏起来的日志（例如第三方服务的回调日志很多，但对于服务接入层的使用者并不关心）
     */
    debug: (...data: any[]) => void;
    /**
     * 开发日志：业务相关调试日志，希望其他开发时也能看到的日志
     */
    log: (...data: any[]) => void;
    /**
     * 生产日志：开发环境也会打印的日志，希望在生产环境打印并且方便调试的日志
     */
    info: (...data: any[]) => void;
    /**
     * 警告日志：一些危险的操作可以在这里打印出来，同时会显示在生产环境（例如警告用户不要在控制台输入不了解的代码以避免账号安全）
     */
    warn: (...data: any[]) => void;
    /**
     * 错误日志：发生错误时使用的日志，发生影响到用户的错误时必须使用该日志
     */
    error: (...data: any[]) => void;
    dir: (item?: any, options?: any) => void;
    dirxml: (...data: any[]) => void;
    table: (tabularData?: any, properties?: string[] | undefined) => void;
    trace: (...data: any[]) => void;
    group: (...data: any[]) => void;
    groupCollapsed: (...data: any[]) => void;
    groupEnd: () => void;
    clear: () => void;
    count: (label?: string | undefined) => void;
    assert: (condition?: boolean | undefined, ...data: any[]) => void;
    time: (label?: string | undefined) => void;
    timeEnd: (label?: string | undefined) => void;
    timeStamp: (label?: string | undefined) => void;
    /**
     * 构造函数
     * @param options 可选项
     * @param options.enable 是否开启日志
     */
    constructor({ enable, level, }?: Pick<Logger, 'enable' | 'level'>);
}
/**
 * 导出一个全局可用的 Logger 对象
 * 使用 enable 属性控制是否开启日志输出，默认为 true
 */
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map