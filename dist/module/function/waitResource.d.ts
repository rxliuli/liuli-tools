interface IWaitResource {
    interval: number;
    max: number;
}
/**
 * 轮询等待指定资源加载完毕再执行操作
 * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
 * @param fn 判断必须的资源是否存在的方法
 * @param option 可配置项
 * @param [option.interval=100] 轮询间隔
 * @param [option.max=10] 最大轮询次数
 * @returns Promise 对象
 */
export declare function waitResource(fn: (...args: any[]) => boolean, { interval, max }?: Partial<IWaitResource>): Promise<{}>;
export {};
//# sourceMappingURL=waitResource.d.ts.map