import { timing } from '../function/timing';
import { emptyFunc } from '../function/emptyFunc';
/**
 * 禁止他人调试网站相关方法的集合对象
 */
export const antiDebug = {
    /**
     * 不停循环 debugger 防止有人调试代码
     */
    cyclingDebugger() {
        setInterval(() => {
            // eslint-disable-next-line no-debugger
            debugger;
        }, 100);
    },
    /**
     * 检查是否正在 debugger 并调用回调函数
     * @param {Function} fn 回调函数，默认为重载页面
     */
    checkDebug(fn = () => window.location.reload()) {
        setInterval(() => {
            const diff = timing(() => {
                for (let i = 0; i < 1000; i++) {
                    console.log(i);
                    console.clear();
                }
            });
            if (diff > 500) {
                console.log(diff);
                fn();
            }
        }, 1000);
    },
    /**
     * 禁用控制台调试输出
     */
    disableConsoleOutput() {
        if (!window.console) {
            return;
        }
        Object.keys(console).forEach(k => (console[k] = emptyFunc));
    },
};
