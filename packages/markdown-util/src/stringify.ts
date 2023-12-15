import { toHast, Options as HastOptions } from 'mdast-util-to-hast'
import { toHtml as hastToHtml, Options as HtmlOptions } from 'hast-util-to-html'
import { Root } from './utils'
import { HastNodes } from 'mdast-util-to-hast/lib'

/**
 * 将一段 markdown ast 序列化为 html
 * @param node
 * @returns
 * @deprecated 请使用 {@link mdToHast} 和 {@link hastToHtml} 代替
 */
export function toHtml(
  node: Root,
  options?: {
    hast?: HastOptions
    html?: HtmlOptions
  },
): string {
  return hastToHtml(toHast(node, options?.hast)!, options?.html)
}

/**
 * 将一段 markdown ast 序列化为 html
 * @depreted 已废弃，请使用 {@link toHtml}
 * @param node
 * @returns
 */
export function stringify(node: Root): string {
  return toHtml(node)
}

export { toHast as mdToHast } from 'mdast-util-to-hast'
export { toHtml as hastToHtml } from 'hast-util-to-html'

export function hastToJsx(hast: HastNodes): string {
  if (hast.type === 'element') {
    const props = hast.properties ? JSON.stringify(hast.properties) : 'null'
    const children = hast.children.map(hastToJsx).join(', ')
    return `React.createElement("${hast.tagName}", ${props}, ${children})`
  } else if (hast.type === 'text') {
    return JSON.stringify(hast.value)
  } else if (hast.type === 'root') {
    return hast.children.map(hastToJsx).join(', ')
  } else {
    return ''
  }
}
