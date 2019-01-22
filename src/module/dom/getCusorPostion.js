/**
 * 获取输入框中光标所在位置
 * @param  {Element} el 需要获取的输入框元素
 * @returns {Number} 光标所在位置的下标
 */
function getCusorPostion (el) {
  return el.selectionStart
}

export default getCusorPostion
