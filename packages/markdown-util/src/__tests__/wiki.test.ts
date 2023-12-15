import { expect, it } from 'vitest'
import { u } from 'unist-builder'
import { Node } from 'unist'
import { flatMap, MdastExtension, ToMarkdownExtension, Root, Text } from '../utils'
import { selectAll } from 'unist-util-select'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'

function join<T>(a: T[], sep: T): T[] {
  const r: T[] = []
  a.forEach((v, i) => {
    if (i !== 0) {
      r.push(sep)
    }
    r.push(v)
  })
  return r
}

function split(str: string, matchs: string[]): string[] {
  let r: string[] = [str]
  for (const m of matchs) {
    r = r.flatMap((s) => join(s.split(m), m).filter((s) => s.length > 0))
  }
  return r
}

it('split', () => {
  expect(split('hello world', ['o', 'l'])).deep.eq(['he', 'l', 'l', 'o', ' w', 'o', 'r', 'l', 'd'])
})

interface WikiLink extends Node {
  value: string
}

function wikiLinkFromMarkdown(): MdastExtension {
  return {
    transforms: [
      (root: Root) => {
        return flatMap(root, (item) => {
          if (item.type !== 'text') {
            return [item]
          }
          const value = (item as Text).value
          const matchs = value.match(/!?\[\[.+\]\]/g) ?? []
          return split(value, matchs).map((s) => {
            if (!/!?\[\[.+\]\]/.test(s)) {
              return u('text', s) as Text
            }
            return u('wiki', {
              value: s,
            }) as WikiLink as any
          })
        })
      },
    ],
  }
}

function wikiLinkToMarkdown(): ToMarkdownExtension {
  return {
    handlers: {
      wiki: (node: WikiLink) => {
        return node.value
      },
    },
  }
}

it('vite', () => {
  const content = `
Support [[Internal link]]
Support [[Internal link|With custom text]]
Support [[Internal link#heading]]
Support [[Internal link#heading|With custom text]]
Support ![[Document.pdf]]
Support ![[Image.png]]
Support ![[Audio.mp3]]
Support ![[Video.mp4]]
Support ![[Embed note]]
Support ![[Embed note#heading]]
  `.trim()
  const root = fromMarkdown(content, {
    mdastExtensions: [wikiLinkFromMarkdown()],
  })
  expect(selectAll('wiki', root).length).eq(10)
  expect(
    toMarkdown(root, {
      extensions: [wikiLinkToMarkdown()],
    }).trim(),
  ).eq(content)
})
