// @ts-check
/**
 * js 的数组去重方法
 * @param {Array.<Object>} arr 要进行去重的数组
 * @param {Function} [fn=item => JSON.stringify(item)] 唯一标识元素的方法，默认使用 {@link JSON.stringify()}
 * @returns {Array.<Object>} 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
export function uniqueBy (arr, fn = item => JSON.stringify(item)) {
  const obj = {}
  return arr.filter(item =>
    obj.hasOwnProperty(fn(item)) ? false : (obj[fn(item)] = true)
  )
}
