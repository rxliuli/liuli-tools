/**
 * 将数组映射为列表
 * @param {Array<T>} array 数组
 * @param {Function<T,U>} keyFn 元素唯一标识
 * @param {Map<U,T>} 映射产生的 map 集合
 */
function arrayToMap (array, keyFn) {
  return array.reduce((res, item) => {
    res.set(keyFn(item), item)
    return res
  }, new Map())
}

export default arrayToMap
