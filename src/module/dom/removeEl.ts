import { Nullable } from '../interface/Nullable'

/**
 * 直接删除指定元素
 * @param el 需要删除的元素
 * @returns 返回被删除的元素
 */
export function removeEl(el: Element): Nullable<Node> {
  const parent = el.parentElement
  if (parent == null) {
    return null
  }
  return parent.removeChild(el)
}
