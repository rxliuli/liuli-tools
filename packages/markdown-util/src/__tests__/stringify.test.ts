import { expect, it } from 'vitest'
import { hastToHtml, mdToHast } from '../stringify'
import { shikiHandler } from '../utils'
import { fromMarkdown } from '../parse'
import { getHighlighter } from 'shiki'
import { HastNodes } from 'mdast-util-to-hast/lib'

it('Handler', async () => {
  const root = fromMarkdown(
    `
# hello world

\`\`\`js
console.log('hello world');
\`\`\`
  `.trim(),
  )
  const high = await getHighlighter({
    themes: ['github-dark', 'github-light'],
  })

  const r = hastToHtml(
    mdToHast(root, {
      handlers: {
        code: shikiHandler(high),
      },
    })!,
  )
  expect(r).include('shiki shiki-dark').include('shiki shiki-light')
})
