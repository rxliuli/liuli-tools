/**
 * 禁止他人调试网站相关方法的集合对象
 */
export declare const antiDebug: {
    /**
     * 不停循环 debugger 防止有人调试代码
     */
    cyclingDebugger(): void;
    /**
     * 检查是否正在 debugger 并调用回调函数
     * @param {Function} fn 回调函数，默认为重载页面
     */
    checkDebug(fn?: () => void): void;
    /**
     * 禁用控制台调试输出
     */
    disableConsoleOutput(): void;
};
//# sourceMappingURL=antiDebug.d.ts.map