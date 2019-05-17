/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param {Function} fn 需要包装的函数
 * @param {Function} paramConverter 参数转换的函数，参数为需要包装函数的参数
 * @returns {Function} 需要被包装的函数
 */
export function onceOfSameParam(fn, paramConverter = (...args) => JSON.stringify(args)) {
    const cacheMap = new Map();
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const key = paramConverter(...args);
            const old = cacheMap.get(key);
            if (old !== undefined) {
                return old;
            }
            const res = Reflect.apply(target, thisArg, args);
            if (res instanceof Promise) {
                return res.then(res => {
                    cacheMap.set(key, res);
                    return res;
                });
            }
            cacheMap.set(key, res);
            return res;
        },
    });
}
