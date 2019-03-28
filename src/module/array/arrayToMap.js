// @ts-check

/**
 * 将数组映射为列表
 * @typedef {any} T 参数数组以及函数的参数类型
 * @typedef {any} R 返回数组以及函数的返回值类型
 * @param {Array.<T>} array 数组
 * @param {Function} keyFn 产生数组元素唯一标识的函数
 * @returns {Map.<R,T>} 映射产生的 map 集合
 */
export function arrayToMap (array, keyFn) {
  return array.reduce((res, item) => {
    res.set(keyFn(item), item)
    return res
  }, new Map())
}
