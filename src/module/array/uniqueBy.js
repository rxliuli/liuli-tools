/**
 * js 的数组去重方法
 * @param {Array.<Object>} arr 要进行去重的数组
 * @param {Function} [kFn=item => JSON.stringify(item)] 唯一标识元素的方法，默认使用 {@link JSON.stringify()}
 * @returns {Array.<Object>} 进行去重操作之后得到的新的数组 (原数组并未改变)
 */
export function uniqueBy (arr, kFn = item => JSON.stringify(item)) {
  const set = new Set()
  return arr.filter((v, ...args) => {
    const k = kFn(v, ...args)
    if (set.has(k)) {
      return false
    }
    set.add(k)
    return true
  })
}
