/**
 * 直接删除指定元素
 * @param {Element} el 需要删除的元素
 */
function removeEl(el) {
  const parent = el.parentElement
  parent.removeChild(el)
}

export default removeEl
