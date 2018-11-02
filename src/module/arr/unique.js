/**
 * js 的数组去重方法
 * 注: 极大量的数组尽量避免使用该方法, 该方法效率很高但内存但代价是内存占用
 * @param {Array} arr 要去重的数组
 * @param {Function} uniqueFn 确定一个元素是否唯一的方法，默认是使用 类型 + 值(symbol 需要特殊处理，因为 Symbol 是绝对唯一的值)
 * @returns {*[]} 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
export default (() => {
  /**
   * 默认的获取到元素唯一标识
   * @param {Object} item 要生成唯一标识的对象
   * @returns 唯一标识的标识对象，这里对 Symbol 类型直接返回
   */
  function defaultUniqueFn(item) {
    const type = typeof item
    if (type === 'symbol') {
      return item
    }
    return type + item
  }
  return function(arr, uniqueFn = defaultUniqueFn) {
    const obj = {}
    return arr.filter(function(item) {
      const uniqueId = uniqueFn(item)
      return obj.hasOwnProperty(uniqueId) ? false : (obj[uniqueId] = true)
    })
  }
})()
