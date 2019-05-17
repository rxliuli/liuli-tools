var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { wait } from '../function/wait';
/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param {Function} fn 异步函数
 * @param {Object} [options={}] 可选参数
 * @param {Number} [options.limit=1] 并发限制数量，默认为 1
 * @returns {Function} 返回被包装后的限制并发功能的函数
 */
export function asyncLimiting(fn, { limit = 1 } = {}) {
    // 当前正在执行异步的数量
    let execCount = 0;
    // waitArr 等待的队列
    const takeQueue = [];
    // 是否增加了 execCount 的标记
    let flag = false;
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const _takeRun = () => __awaiter(this, void 0, void 0, function* () {
                    if (!flag) {
                        execCount++;
                        flag = false;
                    }
                    const tempArgs = takeQueue.shift();
                    // console.log(args + ' 执行前: ' + execCount)
                    try {
                        return yield Reflect.apply(target, thisArg, tempArgs);
                    }
                    finally {
                        // console.log(args + ' 执行后: ')
                        execCount--;
                    }
                });
                takeQueue.push(args);
                // console.log(args + ' 判断前: ')
                yield wait(() => {
                    const result = execCount < limit;
                    if (result) {
                        flag = true;
                        execCount++;
                    }
                    return result;
                });
                // console.log(args + ' 判断后: ' + execCount)
                return _takeRun();
            });
        },
    });
}
