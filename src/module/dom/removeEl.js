// @ts-check
/**
 * 直接删除指定元素
 * @param {Element} el 需要删除的元素
 * @returns {Element} 返回被删除的元素
 */
export function removeEl (el) {
  const parent = el.parentElement
  return parent.removeChild(el)
}
