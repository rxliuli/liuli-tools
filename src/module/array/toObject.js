// @ts-check

/**
 * 将数组转化为一个 Object 对象
 * @deprecated 已废弃，请使用更好的 @override arrayToMap 替代
 * @param {Array.<Object>} arr 需要进行转换的数组
 * @param {Function} kFn 生成对象属性名的函数
 * @param {Function} [vFn] 生成对象属性值的函数，默认为数组中的迭代元素
 * @returns {Object} 转化得到的对象
 */
export function toObject (arr, kFn, vFn = item => item) {
  return arr.reduce((res, item) => {
    if (!res.hasOwnProperty(kFn(item))) {
      res[kFn(item)] = vFn(item)
    }
    return res
  }, {})
}
