/**
 * 在指定范围内删除文本
 * @param {Element} el 需要设置的输入框元素
 * @param {Number} {start} 开始位置，默认为当前选中开始位置
 * @param {Number} {end} 结束位置，默认为当前选中结束位置
 */
function removeText(el, start = el.selectionStart, end = el.selectionEnd) {
  // 删除之前必须要 [记住] 当前光标的位置
  var index = getCusorPostion(el)
  var value = el.value
  el.value = value.substr(0, start) + value.substr(end, value.length)
  setCusorPostion(el, index)
}

export default removeText
