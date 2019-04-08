/**
 * 获取当前选中的文本
 * @param {HTMLFormElement} el 需要设置的输入框元素
 * @param {Number} [start] 开始位置，默认为当前选中开始位置
 * @param {Number} [end] 结束位置，默认为当前选中结束位置
 */
export function getSelectText () {
  return getSelection().toString()
}
