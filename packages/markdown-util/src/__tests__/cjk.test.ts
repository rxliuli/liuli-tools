import { describe, expect, it } from 'vitest'
import { fromMarkdown } from '../parse'
import { hastToHtml, mdToHast } from '../stringify'
import { STRONG_REGEXP, cjk, parseAndTransform } from '../cjk'

describe('strong', () => {
  const render = (s: string) => hastToHtml(mdToHast(fromMarkdown(s, { mdastExtensions: [cjk()] }))!)
  it('render strong', () => {
    const list = [
      [`**真，**她`, '<p><strong>真，</strong>她</p>'],
      [`**真。**她`, '<p><strong>真。</strong>她</p>'],
      [`**真、**她`, '<p><strong>真、</strong>她</p>'],
      [`**真；**她`, '<p><strong>真；</strong>她</p>'],
      [`**真：**她`, '<p><strong>真：</strong>她</p>'],
      [`**真？**她`, '<p><strong>真？</strong>她</p>'],
      [`**真！**她`, '<p><strong>真！</strong>她</p>'],
      [`**真“**她`, '<p><strong>真“</strong>她</p>'],
      [`**真”**她`, '<p><strong>真”</strong>她</p>'],
      [`**真‘**她`, '<p><strong>真‘</strong>她</p>'],
      [`**真’**她`, '<p><strong>真’</strong>她</p>'],
      [`**真（**她`, '<p><strong>真（</strong>她</p>'],
      [`**真）**她`, '<p><strong>真）</strong>她</p>'],
      [`**真【**她`, '<p><strong>真【</strong>她</p>'],
      [`**真】**她`, '<p><strong>真】</strong>她</p>'],
      [`**真《**她`, '<p><strong>真《</strong>她</p>'],
      [`**真》**她`, '<p><strong>真》</strong>她</p>'],
      [`**真—**她`, '<p><strong>真—</strong>她</p>'],
      [`**真～**她`, '<p><strong>真～</strong>她</p>'],
      [`**真…**她`, '<p><strong>真…</strong>她</p>'],
      [`**真·**她`, '<p><strong>真·</strong>她</p>'],
      [`**真〃**她`, '<p><strong>真〃</strong>她</p>'],
      [`**真-**她`, '<p><strong>真-</strong>她</p>'],
      [`**真々**她`, '<p><strong>真々</strong>她</p>'],
      [`**真**她`, '<p><strong>真</strong>她</p>'],
    ]
    list.forEach((it) => {
      expect(render(it[0])).eq(it[1])
    })
  })

  it('Render multiple strong', () => {
    expect(render('**真，**她**真**，她')).eq('<p><strong>真，</strong>她<strong>真</strong>，她</p>')
  })
})

it('clearStrongAfterSpace', () => {
  const render = (s: string) => hastToHtml(mdToHast(fromMarkdown(s, { mdastExtensions: [cjk()] }))!)
  expect(render('**真，** 她**真**，她')).eq('<p><strong>真，</strong>她<strong>真</strong>，她</p>')
})

it('parseAndTransform', () => {
  expect(parseAndTransform('**真，**她', STRONG_REGEXP)).deep.eq([
    { match: true, value: '真，' },
    { match: false, value: '她' },
  ])
  expect(parseAndTransform('**真，**她**真**，她', STRONG_REGEXP)).deep.eq([
    { match: true, value: '真，' },
    { match: false, value: '她**真**，她' },
  ])
})
