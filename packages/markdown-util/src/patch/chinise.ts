import { Transform } from 'mdast-util-from-markdown'
import { MdastExtension, Text, flatMap } from '../utils'

/**
 * 处理中文中的强调和加粗
 * @returns
 */
function strong(): Transform {
  return (root) => {
    flatMap(root, (it) => {
      if (it.type === 'text') {
        const m = (it as Text).value.match(/^(.*)\*\*(.*)\*\*(.*)$/)
        if (!m) {
          return [it]
        }
        const [, l, s, r] = m
        const res = []
        if (l.length > 0) {
          res.push({ type: 'text', value: l })
        }
        res.push({ type: 'strong', children: [{ type: 'text', value: s }] })
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
 * 下面是解析完成之后再单独处理每一段文本，但更好的方式应该是介入 token 解析层
 * @returns
 */
export function chineseFix(): MdastExtension {
  return {
    transforms: [strong(), italic()],
  }
}
