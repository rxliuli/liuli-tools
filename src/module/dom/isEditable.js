// @ts-check
import { toLowerCase } from '../string/toLowerCase'
/**
 * 判断指定元素是否是可编辑元素
 * 注：可编辑元素并不一定能够进行编辑，例如只读的 input 元素
 * @param {Element} el 需要进行判断的元素
 * @returns {Boolean} 是否为可编辑元素
 */
export function isEditable (el) {
  var inputEls = ['input', 'date', 'datetime', 'select', 'textarea']
  return (
    // 此处需要判断是否存在属性 isContentEditable
    // @ts-ignore
    el && (el.isContentEditable || inputEls.includes(toLowerCase(el.tagName)))
  )
}
