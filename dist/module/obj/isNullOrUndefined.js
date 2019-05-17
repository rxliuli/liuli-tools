/**
 * 判断一个对象是否是无效的
 * 无效的值包含 null/undefined
 * @param {Object} object 任何一个对象
 * @returns {Boolean} 是否无效的
 */
export function isNullOrUndefined(object) {
    return object === undefined || object === null;
}
