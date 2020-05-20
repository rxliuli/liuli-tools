import { EmptyFunc } from '../interface/EmptyFunc';
/**
 * 禁止他人调试网站相关方法的集合对象
 */
export declare class AntiDebug {
    /**
     * 不停循环 debugger 防止有人调试代码
     * @returns 取消函数
     */
    static cyclingDebugger(): EmptyFunc;
    /**
     * 检查是否正在 debugger 并调用回调函数
     * @param fn 回调函数，默认为重载页面
     * @returns 取消函数
     */
    static checkDebug(fn?: Function): EmptyFunc;
    /**
     * 禁用控制台调试输出
     * @returns 取消函数
     */
    static disableConsoleOutput(): EmptyFunc;
}
/**
 * 禁止他人调试网站相关方法的集合对象
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export declare const antiDebug: typeof AntiDebug;
//# sourceMappingURL=AntiDebug.d.ts.map