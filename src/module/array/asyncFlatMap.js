// @ts-check

/**
 * 将数组异步压平一层
 * @param {Array.<Object>} arr 数组
 * @param {Function} fn 映射函数，将一个元素映射为一个数组
 * @returns {Promise.<Array.<Object>>} 压平一层的数组
 */
export async function asyncFlatMap (arr, fn) {
  let res = []
  for (const i in arr) {
    res = res.concat(await fn(arr[i]))
  }
  return res
}
