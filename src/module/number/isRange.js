// @ts-check
/**
 * 判断数字是否在指定区间之中
 * @param {Number} num 指定数字
 * @param {Number} min 最小值
 * @param {Number} max 最大值（不包含）
 */
export function isRange (num, min, max) {
  return num >= min && num < max
}
