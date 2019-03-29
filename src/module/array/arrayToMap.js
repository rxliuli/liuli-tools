// @ts-check

/**
 * 将数组映射为 Map
 * @typedef {any} T 参数数组以及函数的参数类型
 * @typedef {any} K kFn 函数的返回值类型
 * @typedef {any} V vFn 函数的返回值类型
 * @param {Array.<T>} array 数组
 * @param {Function} kFn 产生 Map 元素唯一标识的函数
 * @param {Function} [vFn] 产生 Map 值的函数，默认为返回数组的元素
 * @returns {Map.<K,V>} 映射产生的 map 集合
 */
export function arrayToMap (array, kFn, vFn = v => v) {
  return array.reduce((res, item) => {
    res.set(kFn(item), vFn(item))
    return res
  }, new Map())
}
