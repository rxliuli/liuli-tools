/**
 * 创建一个等差数列数组
 * @param {Number} start 开始（包含）
 * @param {Number} end 结束（不包含）
 * @param {Number} {sep} 步长，默认为 1
 * @returns {Array} 等差数列数组
 */
function range (start, end, sep = 1) {
  var arr = []
  for (let i = start; i < end; i += sep) {
    arr.push(i)
  }
  return arr
}

export default range
