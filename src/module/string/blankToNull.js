// @ts-check
/**
 * 将空白字符串转换为 null
 *
 * @param {String} str 将空字符串转换为 {@code null}
 * @returns {String} 可能为 {@code null}
 */
export function blankToNull (str) {
  return !str || str.trim().length === 0 ? null : str
}
