import { visit as unistUtilVisit } from 'unist-util-visit'
import { Code, Parent, PhrasingContent, Root, YAML } from 'mdast'
import { Node } from 'unist'
import * as yaml from 'yaml'
import { select } from 'unist-util-select'
import { remove } from 'unist-util-remove'
import { Extension } from 'mdast-util-from-markdown'
import { Options as ToMarkdownExtension } from 'mdast-util-to-markdown'
import { fromHtml } from 'hast-util-from-html'
import { Handler } from 'mdast-util-to-hast'
import { Highlighter, Lang } from 'shiki'

export type {
  AlignType,
  ReferenceType,
  Content,
  TopLevelContent,
  BlockContent,
  FrontmatterContent,
  DefinitionContent,
  ListContent,
  TableContent,
  RowContent,
  PhrasingContent,
  StaticPhrasingContent,
  // interface
  BlockContentMap,
  FrontmatterContentMap,
  DefinitionContentMap,
  StaticPhrasingContentMap,
  PhrasingContentMap,
  ListContentMap,
  TableContentMap,
  RowContentMap,
  Parent,
  Literal,
  Root,
  Paragraph,
  Heading,
  ThematicBreak,
  Blockquote,
  List,
  ListItem,
  Table,
  TableRow,
  TableCell,
  HTML,
  Code,
  YAML,
  Definition,
  FootnoteDefinition,
  Text,
  Emphasis,
  Strong,
  Delete,
  InlineCode,
  Break,
  Link,
  Image,
  LinkReference,
  ImageReference,
  Footnote,
  FootnoteReference,
  Resource,
  Association,
  Reference,
  Alternative,
} from 'mdast'
export type { Node } from 'unist'
export { u } from 'unist-builder'
export { select, selectAll } from 'unist-util-select'
export { toString } from 'mdast-util-to-string'
export type { Extension as MicromarkSyntaxExtension } from 'micromark-util-types'
export type { Extension as MdastExtension } from 'mdast-util-from-markdown'
export type { Options as ToMarkdownExtension } from 'mdast-util-to-markdown'

/**
 * 遍历 ast 节点
 */
export function visit(node: Node, callback: (node: Node) => void) {
  unistUtilVisit(node, callback)
}

/**
 * 获取 markdown 的 yaml 元数据
 * @param root
 * @returns
 */
export function getYamlMeta<T>(root: Root): T {
  const r = select('yaml', root)
  return yaml.parse(r ? (r as YAML).value : '')
}

/**
 * 设置 markdown 的 yaml 元数据
 * @param root
 * @param meta 元数据，如果是 undefined/null 则元数据会被删除
 * @returns
 */
export function setYamlMeta(root: Root, meta: object | undefined | null) {
  if (meta === undefined || meta === null) {
    remove(root, 'yaml')
    return
  }
  const r = select('yaml', root) as YAML
  if (r) {
    r.value = yaml.stringify(meta).trim()
  } else {
    root.children.unshift({
      type: 'yaml',
      value: yaml.stringify(meta).trim(),
    } as YAML)
  }
}

/**
 * 映射一棵 ast 树
 * 注：其中会执行真实的修改操作
 * @param tree
 * @param fn
 * @returns
 */
export function flatMap<T extends Node>(tree: T, fn: (node: Node, i: number, parent?: Parent) => Node[]): T {
  function transform(node: Node, i: number, parent?: Parent): Node[] {
    if ('children' in node) {
      const p = node as unknown as Parent
      p.children = p.children.flatMap((item, i) => transform(item, i, p)) as any
    }
    return fn(node, i, parent)
  }
  return transform(tree, 0, undefined)[0] as T
}

/**
 * 支持自动将 \n 转换为 break 标签
 * @link copy from https://github.com/remarkjs/remark-breaks/blob/main/index.js
 * @returns
 */
export function breaksFromMarkdown(): Extension {
  const find = /[\t ]*(?:\r?\n|\r)/g
  return {
    transforms: [
      (tree) => {
        unistUtilVisit(tree, 'text', (node, index, parent) => {
          const result: PhrasingContent[] = []
          let start = 0

          find.lastIndex = 0

          let match = find.exec(node.value)

          while (match) {
            const position = match.index

            if (start !== position) {
              result.push({ type: 'text', value: node.value.slice(start, position) })
            }

            result.push({ type: 'break' })
            start = position + match[0].length
            match = find.exec(node.value)
          }

          if (result.length > 0 && parent && typeof index === 'number') {
            if (start < node.value.length) {
              result.push({ type: 'text', value: node.value.slice(start) })
            }

            parent.children.splice(index, 1, ...result)
            return index + result.length
          }
        })
      },
    ],
  }
}

/**
 * 将 break 标签转换为 \n 而非 \\n，与上面的 {@link breaksFromMarkdown} 配合使用
 * @returns
 */
export function breaksToMarkdown(): ToMarkdownExtension {
  return {
    handlers: {
      break: () => '\n',
    },
  }
}

/**
 * 支持使用 shiki 高亮代码¬
 * @param high
 * @returns
 */
export function shikiHandler(high: Highlighter): Handler {
  return (_state, node: Code, _parent) => {
    const f = (theme: 'light' | 'dark', themeValue: string) =>
      select(
        'element[tagName="pre"]',
        fromHtml(
          high
            .codeToHtml(node.value, { lang: node.lang as Lang, theme: themeValue })
            .replace('<pre class="shiki ', `<pre class="shiki shiki-${theme} `),
        ),
      )
    return [f('dark', 'github-dark'), f('light', 'github-light')] as any
  }
}
