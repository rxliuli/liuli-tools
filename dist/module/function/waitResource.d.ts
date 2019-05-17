/**
 * 轮询等待指定资源加载完毕再执行操作
 * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
 * @param {Function} fn 判断必须的资源是否存在的方法
 * @param {Object} option 可配置项
 * @param {Number} [option.interval=100] 轮询间隔
 * @param {Number} [option.max=10] 最大轮询次数
 * @returns Promise 对象
 */
export declare function waitResource(fn: any, { interval, max }?: {
    interval?: number | undefined;
    max?: number | undefined;
}): Promise<{}>;
//# sourceMappingURL=waitResource.d.ts.map