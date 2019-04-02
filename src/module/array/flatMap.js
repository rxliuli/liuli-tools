// @ts-check

/**
 * 自行实现 flatMap，将数组压平一层
 * @param {Array.<Object>} arr 数组
 // @ts-ignore
 * @param {function(item:Object):Array.<Object>} fn 映射方法，将一个元素映射为一个数组
 * @returns {Array.<Object>} 压平一层的数组
 */
export function flatMap (arr, fn) {
  // @ts-ignore
  return arr.reduce((res, item) => res.concat(fn(item)), [])
}
