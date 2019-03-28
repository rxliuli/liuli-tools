// @ts-check

/**
 * 自行实现 flatMap，将数组压平一层
 * @typedef {any} T 数组参数泛型类型和映射函数的参数类型
 * @typedef {any} R 返回数组泛型类型和映射函数的返回值类型
 * @param {Array.<T>} arr 数组
 * @param {Function} fn 映射方法，将一个元素映射为一个数组
 * @returns {Array.<R>} 压平一层的数组
 */
export function flatMap (arr, fn) {
  return arr.reduce((res, item) => res.concat(fn(item)), [])
}
