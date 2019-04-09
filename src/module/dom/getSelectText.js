// @ts-check
/**
 * 获取当前选中的文本
 * @returns {String} 当前选中的文本
 */
export function getSelectText () {
  return getSelection().toString()
}
