import { getObjectKeys } from './getObjectKeys';
/**
 * 获取对象中所有的属性值，包括 ES6 新增的 Symbol 类型的属性
 * @param {Object} object 任何对象
 * @returns {Array.<String|Symbol>} 属性值数组
 */
export function getObjectValues(object) {
    // @ts-ignore
    return getObjectKeys(object).map(k => object[k]);
}
