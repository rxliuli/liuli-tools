import { blankToNull } from './../string/blankToNull';
import { getObjectKeys } from './getObjectKeys';
/**
 * 置空对象所有空白的属性
 *
 * @param {Object} obj 对象
 * @returns {Object} 将所有的空白属性全部转换为 null 的新对象
 */
export function blankToNullField(obj) {
    const res = {};
    getObjectKeys(obj).forEach(k => {
        // @ts-ignore
        const v = obj[k];
        res[k] = typeof v === 'string' ? blankToNull(v) : v;
    });
    return res;
}
