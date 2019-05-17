var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 将数组异步压平一层
 * @param {Array.<Object>} arr 数组
 * @param {Function} fn 映射函数，将一个元素映射为一个数组
 * @returns {Promise.<Array.<Object>>} 压平一层的数组
 */
export function asyncFlatMap(arr, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = [];
        for (let i = 0; i < arr.length; i++) {
            res.push(...(yield fn(arr[i])));
        }
        return res;
    });
}
