/**
 * js 数组按照某个条件进行分组
 * @param {Array} arr 要进行分组的数组
 * @param {Function} {fn} 元素分组的方法，默认使用 {@link JSON.stringify()}
 * @returns {Object<String, Array>} 对象 -> 数组映射对象
 */
function groupBy (arr, fn = item => JSON.stringify(item)) {
  // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
  return arr.reduce((obj, item) => {
    const name = fn(item)
    // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
    ;(obj[name] || (obj[name] = [])).push(item)
    return obj
  }, {})
}

export default groupBy
