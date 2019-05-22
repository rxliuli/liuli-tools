import { Nullable } from '../interface/Nullable'

/**
 * 根据 html 字符串创建 Element 元素
 * @param str html 字符串
 * @returns 创建的 Element 元素
 */
export function createElByString(str: string): Nullable<Element> {
  const root = document.createElement('div')
  root.innerHTML = str
  return root.querySelector('*')
}
