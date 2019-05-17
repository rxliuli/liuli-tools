/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param {Function} fn 需要包装的函数
 * @param {Function} paramConverter 参数转换的函数，参数为需要包装函数的参数
 * @returns {Function} 需要被包装的函数
 */
export declare function onceOfSameParam(fn: any, paramConverter?: (...args: any[]) => string): any;
//# sourceMappingURL=onceOfSameParam.d.ts.map