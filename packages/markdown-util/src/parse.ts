import { fromMarkdown as fm, Options as FmOptions, Extension } from 'mdast-util-from-markdown'
import { Options as TmOptions, toMarkdown as tm } from 'mdast-util-to-markdown'
import type { Root, RootContent } from 'mdast'
import { frontmatterFromMarkdown, frontmatterToMarkdown } from 'mdast-util-frontmatter'
import { frontmatter } from 'micromark-extension-frontmatter'
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'
import { math } from 'micromark-extension-math'
import { mathFromMarkdown, mathToMarkdown } from 'mdast-util-math'

/**
 * 解析 markdown 文本为 ast
 * @param content
 * @returns
 */
export function fromMarkdown(content: string, options?: FmOptions): Root {
  return fm(content, {
    ...options,
    extensions: [frontmatter(['yaml']), gfm(), math()].concat(options?.extensions ?? []),
    mdastExtensions: [frontmatterFromMarkdown(['yaml']), gfmFromMarkdown(), mathFromMarkdown()].concat(
      options?.mdastExtensions ?? [],
    ),
  })
}

/**
 * 将 markdown ast 转换为文本
 * @param ast
 * @returns
 */
export function toMarkdown(ast: RootContent | Root, options?: TmOptions): string {
  return tm(ast, {
    listItemIndent: 'one',
    bullet: '-',
    ...options,
    extensions: [frontmatterToMarkdown(['yaml']), gfmToMarkdown(), mathToMarkdown()].concat(options?.extensions ?? []),
  })
}
