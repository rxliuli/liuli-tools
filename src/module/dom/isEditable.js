import toLowerCase from '../string/toLowerCase'
/**
 * 判断指定元素是否是可编辑元素
 * 注：可编辑元素并不一定能够进行编辑，例如只读的 input 元素
 * @param {Element} el 需要进行判断的元素
 * @returns {Boolean} 是否为可编辑元素
 */
function isEditable (el) {
  var inputEls = ['input', 'date', 'datetime', 'select', 'textarea']
  return (
    el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
  )
}

export default isEditable
