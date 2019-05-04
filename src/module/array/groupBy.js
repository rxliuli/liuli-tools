/**
 * js 数组按照某个条件进行分组
 *
 * @param {Array<Object>} arr 要进行分组的数组
 * @param {Function} kFn 元素分组的唯一标识函数
 * @param {Function} [vFn] 元素分组的值处理的函数。第一个参数是累计值，第二个参数是当前正在迭代的元素，如果你使用过 {@link Array#reduce} 函数的话应该对此很熟悉
 * @param {Function} [init=[]] 每个分组的产生初始值的函数。类似于 reduce 的初始值，但它是一个函数，避免初始值在所有分组中进行累加。
 * @returns {Map<Object,Object>} 对象 -> 数组映射对象
 */
export function groupBy (
  arr,
  kFn,
  /**
   * 默认的值处理函数
   * @param {Map} res 最终 map 集合
   * @param {Object} item 当前迭代的元素
   */
  vFn = (res, item) => {
    res.push(item)
    return res
  },
  init = () => []
) {
  // 将元素按照分组条件进行分组得到一个 条件 -> 数组 的对象
  return arr.reduce((res, item) => {
    const k = kFn(item)
    // 如果已经有这个键了就直接追加, 否则先将之赋值为 [] 再追加元素
    if (!res.has(k)) {
      res.set(k, init())
    }
    res.set(k, vFn(res.get(k), item))
    return res
  }, new Map())
}
