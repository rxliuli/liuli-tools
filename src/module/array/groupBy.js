// @ts-check

/**
 * js 数组按照某个条件进行分组
 *
 * @param {Array<Object>} arr 要进行分组的数组
 * @param {Function} fn 元素分组的方法
 * @returns {Map<Object,Object>} 对象 -> 数组映射对象
 */
export function groupBy (arr, fn) {
  // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
  return arr.reduce((res, item) => {
    const name = fn(item)
    // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
    if (!res.has(name)) {
      res.set(name, [])
    }
    res.get(name).push(item)
    return res
  }, new Map())
}
