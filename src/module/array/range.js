// @ts-check

/**
 * 创建一个等差数列数组
 * @param {Number} start 开始（包含）
 * @param {Number} end 结束（不包含）
 * @param {Number} [sep] 步长，默认为 1
 * @returns {Array.<Number>} 等差数列数组
 */
export function range (start, end, sep = 1) {
  const arr = []
  for (let i = start; i < end; i += sep) {
    arr.push(i)
  }
  return arr
}
