/**
 * 将数组异步压平一层
 * @param {Array} arr 数组
 * @param {Function} fn 映射方法，将一个元素映射为一个数组
 * @returns {Array} 压平一层的数组
 */
async function asyncFlatMap (arr, fn) {
  var res = []
  for (const i in arr) {
    res.push(...(await fn(arr[i])))
  }
  return res
}

export default asyncFlatMap
