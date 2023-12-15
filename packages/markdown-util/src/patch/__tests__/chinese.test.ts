import { assert, expect, it } from 'vitest'
import { fromMarkdown } from '../../parse'
import { toHtml } from '../../stringify'
import { chineseFix } from '../chinise'
import { codes } from 'micromark-util-symbol/codes'
import { types } from 'micromark-util-symbol/types'
import { Code, Construct, Previous, State, Tokenizer } from 'micromark-util-types'
import { markdownLineEnding, markdownSpace } from 'micromark-util-character'
import { constants } from 'micromark-util-symbol/constants'
import { factorySpace } from 'micromark-factory-space'

it('strong', () => {
  const render = (s: string) => toHtml(fromMarkdown(s, { mdastExtensions: [chineseFix()] }))

  const s1 = '&ZeroWidthSpace;**真，**她。'
  expect(render(s1)).eq('<p>​<strong>真，</strong>她。</p>')
  const s2 = '**&ZeroWidthSpace;真，**她。'
  expect(render(s2)).eq('<p><strong>​真，</strong>她。</p>')
  const s3 = '**真，&ZeroWidthSpace;**她。'
  expect(render(s3)).eq('<p><strong>真，​</strong>她。</p>')
  const s4 = '**真，**&ZeroWidthSpace;她。'
  expect(render(s4)).eq('<p><strong>真，</strong>​她。</p>')
  const s5 = '&ZeroWidthSpace;**&ZeroWidthSpace;真，**她。'
  expect(render(s5)).eq('<p>​<strong>​真，</strong>她。</p>')
  const s6 = '&ZeroWidthSpace;**真，&ZeroWidthSpace;**她。'
  expect(render(s6)).eq('<p>​<strong>真，​</strong>她。</p>')
  const s7 = '&ZeroWidthSpace;**真，**&ZeroWidthSpace;她。'
  expect(render(s7)).eq('<p>​<strong>真，</strong>​她。</p>')
  const s8 = '**&ZeroWidthSpace;真，&ZeroWidthSpace;**她。'
  expect(render(s8)).eq('<p><strong>​真，​</strong>她。</p>')
  const s9 = '**&ZeroWidthSpace;真，**&ZeroWidthSpace;她。'
  expect(render(s9)).eq('<p><strong>​真，</strong>​她。</p>')
  const s10 = '**真，&ZeroWidthSpace;**&ZeroWidthSpace;她。'
  expect(render(s10)).eq('<p><strong>真，​</strong>​她。</p>')
  const s11 = '&ZeroWidthSpace;**&ZeroWidthSpace;真，&ZeroWidthSpace;**她。'
  expect(render(s11)).eq('<p>​<strong>​真，​</strong>她。</p>')
  const s12 = '&ZeroWidthSpace;**&ZeroWidthSpace;真，**&ZeroWidthSpace;她。'
  expect(render(s12)).eq('<p>​<strong>​真，</strong>​她。</p>')
  const s13 = '&ZeroWidthSpace;**&ZeroWidthSpace;真，&ZeroWidthSpace;**&ZeroWidthSpace;她。'
  expect(render(s13)).eq('<p>​<strong>​真，​</strong>​她。</p>')
  const s14 = '&ZeroWidthSpace;**真，&ZeroWidthSpace;**&ZeroWidthSpace;她。'
  expect(render(s14)).eq('<p>​<strong>真，​</strong>​她。</p>')
  const s15 = '**&ZeroWidthSpace;真，&ZeroWidthSpace;**&ZeroWidthSpace;她。'
  expect(render(s15)).eq('<p><strong>​真，​</strong>​她。</p>')
})

it('italic', () => {
  const render = (s: string) => toHtml(fromMarkdown(s, { mdastExtensions: [chineseFix()] }))
  const s1 = '&ZeroWidthSpace;*真，*她。'
  expect(render(s1)).eq('<p>​<em>真，</em>她。</p>')
  const s2 = '*&ZeroWidthSpace;真，*她。'
  expect(render(s2)).eq('<p><em>​真，</em>她。</p>')
  const s3 = '&ZeroWidthSpace;_真，_她。'
  expect(render(s3)).eq('<p>​<em>真，</em>她。</p>')
  const s4 = '_&ZeroWidthSpace;真，_她。'
  expect(render(s4)).eq('<p><em>​真，</em>她。</p>')
})
