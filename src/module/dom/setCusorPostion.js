// @ts-check
/**
 * 设置输入框中选中的文本/光标所在位置
 * @param {HTMLFormElement} el 需要设置的输入框元素
 * @param {Number} start 光标所在位置的下标
 * @param {Number} [end=start] 结束位置，默认为输入框结束
 */
export function setCusorPostion (el, start, end = start) {
  el.focus()
  el.setSelectionRange(start, end)
}
