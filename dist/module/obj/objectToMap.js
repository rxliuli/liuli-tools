import { getObjectKeys } from './getObjectKeys';
/**
 * 将 Object 对象 转换为 Map
 * @param {Object} obj Object 对象
 * @returns {Map} 转换得到的 Map 键值表
 */
export function objectToMap(obj) {
    // @ts-ignore
    return getObjectKeys(obj).reduce((map, k) => map.set(k, obj[k]), new Map());
}
