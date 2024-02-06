import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { inspect } from 'unist-util-inspect'
import { describe, expect, it } from 'vitest'
import {
  Heading,
  Paragraph,
  visit,
  Image,
  Text,
  u,
  selectAll,
  flatMap,
  Strong,
  breaksFromMarkdown,
  breaksToMarkdown,
} from '../utils'
import { Extension } from 'mdast-util-from-markdown'
import { Handle } from 'mdast-util-from-markdown'
import { hastToHtml, mdToHast } from '..'

it('visit', () => {
  const ast = fromMarkdown(`# hello
## sub1
## sub2
### sub3
`)
  const list: string[] = []
  visit(ast, (node) => {
    if (node.type === 'heading' && (node as Heading).depth === 2) {
      list.push(
        (node as Heading).children
          .map((v) => toMarkdown(v))
          .join('')
          .trim(),
      )
    }
  })
  expect(list).toEqual(['sub1', 'sub2'])
})

it('images', () => {
  const root = fromMarkdown(`![cover](./cover.png)
  [cover](./test)`)
  const list: string[] = []
  visit(root, (node) => {
    if (node.type === 'image') {
      list.push((node as Image).url)
    }
  })
  expect(list).toEqual(['./cover.png'])
})

it('remove space for strong after', () => {
  const root = fromMarkdown(`**真没想到我这么快就要死了，** 她有些自暴自弃地想着。`)
  expect(hastToHtml(mdToHast(root)!)).toBe('<p><strong>真没想到我这么快就要死了，</strong> 她有些自暴自弃地想着。</p>')
  visit(root, (item) => {
    if (item.type === 'paragraph') {
      const children = (item as Paragraph).children
      children.forEach((item, i) => {
        if (item.type === 'strong') {
          const next = children[i + 1]
          const s = (item.children[0] as Text).value
          const last = s.slice(s.length - 1)
          console.log(last)
          if (next && next.type === 'text' && ['，', '。', '？', '！'].includes(last) && next.value.startsWith(' ')) {
            next.value = next.value.trim()
          }
        }
      })
    }
  })
  expect(hastToHtml(mdToHast(root)!)).toBe('<p><strong>真没想到我这么快就要死了，</strong>她有些自暴自弃地想着。</p>')
})

describe('selectAll', () => {
  const root = u('blockquote', [
    u('paragraph', [u('text', 'Alpha')]),
    u('code', 'Charlie'),
    u('paragraph', [u('text', 'Golf')]),
  ])
  it('basic', () => {
    const r = selectAll('text,code', root)
    expect(r.length).eq(3)
  })
  it('deep', () => {
    const r = selectAll('paragraph,text', root)
    // console.log(r)
    expect(r.length).eq(4)
  })
})
it('flatMap', () => {
  const md = `
# hello

- Helen Perez
- Margaret Rodriguez
  - Christopher Hall
    - Kenneth Hernandez
    - Eric Johnson
      - Christopher Jackson
      - Sandra Young
        - Jose Clark
          - Donna Young
            1. Robert Johnson
            2. Barbara Young
            3. Timothy Gonzalez
                - Jennifer Perez
                  - Jose White
            4. Edward Brown
  `.trim()
  const root = fromMarkdown(md)
  const start = Date.now()
  flatMap(root, (item) => {
    return [item]
  })
  expect(Date.now() - start).lt(100)
})
it('flatMap using parent', () => {
  const s = `**真没想到我这么快就要死了，** 她有些自暴自弃地想着。`
  const root = fromMarkdown(s)
  expect(hastToHtml(mdToHast(root)!)).eq('<p><strong>真没想到我这么快就要死了，</strong> 她有些自暴自弃地想着。</p>')
  flatMap(root, (item, i, p) => {
    if (item.type === 'strong') {
      const v = item as Strong
      const next = p!.children[i + 1]
      const s = (v.children[0] as Text).value
      if (s) {
        const last = s.slice(s.length - 1)
        if (
          next &&
          next.type === 'text' &&
          ['，', '。', '？', '！', '〉'].includes(last) &&
          next.value.startsWith(' ')
        ) {
          next.value = next.value.trim()
        }
      }
    }
    return [item]
  })
  expect(hastToHtml(mdToHast(root)!)).eq('<p><strong>真没想到我这么快就要死了，</strong>她有些自暴自弃地想着。</p>')
})

it('breaks', () => {
  const s = 'test1\ntest2'
  const root = fromMarkdown(s, {
    mdastExtensions: [breaksFromMarkdown()],
  })
  expect(hastToHtml(mdToHast(root)!)).eq('<p>test1<br>\ntest2</p>')
  expect(
    toMarkdown(root, {
      extensions: [breaksToMarkdown()],
    }).trim(),
  ).eq(s)
})
