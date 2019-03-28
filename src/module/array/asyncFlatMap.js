// @ts-check

/**
 * 将数组异步压平一层
 * @typedef {any} T 数组参数泛型类型和映射函数的参数类型
 * @typedef {any} R 返回数组泛型类型和映射函数的返回值类型
 * @param {Array.<T>} arr 数组
 * @param {Function} fn 映射函数，将一个元素映射为一个数组
 * @returns {Promise.<Array.<R>>} 压平一层的数组
 */
export async function asyncFlatMap (arr, fn) {
  let res = []
  for (const i in arr) {
    res = res.concat(await fn(arr[i]))
  }
  return res
}
