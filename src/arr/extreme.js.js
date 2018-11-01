/**
 * 获取数组中最大的元素
 *
 * @param {Array} arr 一个需要获取最大值的数组
 * @param {Function} compareFn 数组中的元素比较函数，0 代表相等，小于 0 代表 false，大于 0 代表 true
 */
module.exports = function(arr, compareFn) {
  if (!arr || arr.length < 1) {
    return null
  }
  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i]
    if (compareFn(max, item) > 0) {
      max = item
    }
  }
  return max
}
