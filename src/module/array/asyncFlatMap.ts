/**
 * 将数组异步压平一层
 * @param {Array.<Object>} arr 数组
 * @param {Function} fn 映射函数，将一个元素映射为一个数组
 * @returns {Promise.<Array.<Object>>} 压平一层的数组
 */
export async function asyncFlatMap (arr, fn) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    res.push(...(await fn(arr[i])))
  }
  return res
}
