import { Transform } from 'mdast-util-from-markdown'
import { MdastExtension, Paragraph, Strong, Text, flatMap, select, visit } from './utils'
import { fromMarkdown, toMarkdown } from './parse'

/**
 * 实现一个简单的字符串解析和转换函数，使用正则表达式匹配字符串，并将一个字符串替换为一个数组，其中包含匹配的子字符串和匹配的子字符串，返回一个数组。
 * 例如：
 * @example f('hello world', /l/) => [{ match: true, value: 'l' }, { match: false, value: 'he' }, { match: false, value: 'lo wor' }, { match: true, value: 'l' }, { match: false, value: 'd' }]
 * @param s
 */
export function parseAndTransform(
  inputString: string,
  regex: RegExp,
): {
  match: boolean
  value: string
}[] {
  let result: {
    match: boolean
    value: string
  }[] = []
  let lastIndex = 0
  inputString.replace(regex, (match, offset) => {
    // Add the text before the match
    if (offset > lastIndex) {
      result.push({ match: false, value: inputString.slice(lastIndex, offset) })
    }
    // Add the matched text
    result.push({ match: true, value: match.slice(2, match.length - 2) })
    lastIndex = offset + match.length
    return '' // Return an empty string
  })
  // Add any remaining text after the last match
  if (lastIndex < inputString.length) {
    result.push({ match: false, value: inputString.slice(lastIndex) })
  }
  return result
}

export const STRONG_REGEXP = /\*\*.*?[，。、；：？！“”‘’（）【】《》—～…·〃\-々]\*\*/

/**
 * 处理中文中的强调和加粗
 * @returns
 */
export function parseStrong(): Transform {
  return (root) => {
    flatMap(root, (it) => {
      if (it.type === 'paragraph') {
        const text = toMarkdown(it as Paragraph).trimEnd()
        const r = parseAndTransform(text, STRONG_REGEXP)
        return [
          {
            type: 'paragraph',
            children: r.flatMap((it) => {
              if (it.match) {
                return [{ type: 'strong', children: [{ type: 'text', value: it.value }] }]
              }
              return (select('paragraph', fromMarkdown(it.value)) as Paragraph)?.children
            }),
          } as Paragraph,
        ]
      }
      if (it.type === 'text') {
        const list = parseAndTransform((it as Text).value, STRONG_REGEXP)
        return list.map((it) => {
          if (it.match) {
            return { type: 'strong', children: [{ type: 'text', value: it.value }] }
          }
          return { type: 'text', value: it.value }
        })
      }
      return [it]
    })
    return root
  }
}

/**
 * 清理粗体之后的空格
 * @returns
 */
export function clearStrongAfterSpace(): Transform {
  return (root) => {
    visit(root, (it) => {
      if (it.type === 'paragraph') {
        const children = (it as Paragraph).children
        children.forEach((it, i) => {
          if (it.type === 'strong') {
            const next = children[i + 1]
            const s = (it.children[0] as Text).value
            if (s) {
              const last = s.slice(s.length - 1)
              if (
                next &&
                next.type === 'text' &&
                '，。、；：？！“”‘’（）【】《》—～…·〃-々'.split('').includes(last) &&
                next.value.startsWith(' ')
              ) {
                next.value = next.value.trim()
              }
            }
          }
        })
      }
    })
    return root
  }
}

/**
 * 处理中文中的斜体
 * @returns
 * @todo 有些情况下，斜体和强调会同时出现，这时候需要处理
 */
function italic(): Transform {
  return (root) => {
    flatMap(root, (it) => {
      if (it.type === 'text') {
        let m = (it as Text).value.match(/^(.*)[\*](.*)\*(.*)$/)
        if (!m) {
          m = (it as Text).value.match(/^(.*)[\_](.*)\_(.*)$/)
          if (!m) {
            return [it]
          }
        }
        const [, l, s, r] = m
        const res = []
        if (l.length > 0) {
          res.push({ type: 'text', value: l })
        }
        res.push({ type: 'emphasis', children: [{ type: 'text', value: s }] })
        if (r.length > 0) {
          res.push({ type: 'text', value: r })
        }
        return res
      }
      return [it]
    })
    return root
  }
}

/**
 * 支持解析中文中的符号，主要是处理粗体与斜体的一些问题
 * 下面是解析完成之后再单独处理每一段文本，但更好的方式应该是介入 token 解析层
 * @link 参考 issue: https://github.com/commonmark/commonmark-spec/issues/650
 * @returns
 * @beta
 */
export function cjk(): MdastExtension {
  return {
    transforms: [parseStrong(), clearStrongAfterSpace()],
  }
}
