declare type NoParamVoidFunc = () => void | PromiseLike<void>;
/**
 * 一个简单的微任务队列辅助类
 * 注：该 class 是为了解决问题 https://segmentfault.com/q/1010000019115775
 */
export declare class MicrotaskQueue {
    tasks: NoParamVoidFunc[];
    private isRunning;
    add(func: NoParamVoidFunc, index?: number): this;
    private start;
}
export {};
//# sourceMappingURL=MicrotaskQueue.d.ts.map