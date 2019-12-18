/**
 * 自定义的日志类
 * 主要便于在开发环境下正常显示调试信息，在生产环境则默认关闭它
 */
export declare class Logger {
    /**
     * 设置 enable 的 setter 属性，在改变时合并对应的子类对象实现
     * @param enable 是否开启
     */
    set enable(enable: boolean);
    debug: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    log: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    dir: (value?: any, ...optionalParams: any[]) => void;
    dirxml: (value: any) => void;
    table: (...tabularData: any[]) => void;
    trace: (message?: any, ...optionalParams: any[]) => void;
    group: (groupTitle?: string | undefined, ...optionalParams: any[]) => void;
    groupCollapsed: (groupTitle?: string | undefined, ...optionalParams: any[]) => void;
    groupEnd: () => void;
    clear: () => void;
    count: (label?: string | undefined) => void;
    assert: (condition?: boolean | undefined, message?: string | undefined, ...data: any[]) => void;
    profile: (reportName?: string | undefined) => void;
    profileEnd: (reportName?: string | undefined) => void;
    time: (label?: string | undefined) => void;
    timeEnd: (label?: string | undefined) => void;
    timeStamp: (label?: string | undefined) => void;
    /**
     * 是否开启日志
     */
    private _enable;
    /**
     * 构造函数
     * @param options 可选项
     * @param options.enable 是否开启日志
     */
    constructor({ enable }?: {
        enable?: boolean | undefined;
    });
}
/**
 * 导出一个全局可用的 Logger 对象
 * 使用 enable 属性控制是否开启日志输出，默认为 true
 */
export declare const logger: Logger;
//# sourceMappingURL=logger.d.ts.map