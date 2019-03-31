// @ts-check

/**
 * 将数组映射为 Map
 * @param {Array.<Object>} array 数组
 * @param {function} kFn 产生 Map 元素唯一标识的函数
 * @param {Function} [vFn] 产生 Map 值的函数，默认为返回数组的元素
 * @returns {Map.<Object,Object>} 映射产生的 map 集合
 */
export function arrayToMap (array, kFn, vFn = v => v) {
  return array.reduce((res, item) => {
    res.set(kFn(item), vFn(item))
    return res
  }, new Map())
}
