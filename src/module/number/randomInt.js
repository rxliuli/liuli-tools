/**
 * 生成一个随机的数字
 * 如果没有参数，则会抛出异常
 * @param {Number} args 参数列表，如果只有一个参数，则认为是最大值，最小值为 0。否则认为第一个是最小值，第二个是最大值，忽略剩余的参数
 * @returns {Number} 生成的随机整数
 */
export function randomInt (...args) {
  let min
  let max
  if (args.length === 0) {
    throw new Error('非法参数，必须指定最大值')
  } else if (args.length === 1) {
    min = 0
    max = args[0]
  } else if (args.length > 1) {
    min = args[0]
    max = args[1]
  }
  return min + Math.floor(Math.random() * (max - min))
}
