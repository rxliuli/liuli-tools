declare type NoParamVoidFunc = () => void | PromiseLike<void>;
/**
 * 一个简单的微任务队列辅助类，使用（宏）命令模式实现
 * 注：该 class 是为了解决问题 https://segmentfault.com/q/1010000019115775
 */
export declare class MicrotaskQueue {
    tasks: NoParamVoidFunc[];
    private lock;
    add(func: NoParamVoidFunc): this;
    execute(): void;
}
export {};
//# sourceMappingURL=MicrotaskQueue.d.ts.map