import { expect, it } from 'vitest'
import { getHighlighter } from 'shiki'

it('render', async () => {
  const highlighter = await getHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['javascript'],
  })
  expect(
    highlighter
      .codeToHtml(`console.log('shiki');`, {
        lang: 'javascript',
        theme: 'github-dark',
      })
      .replace('<pre class="shiki ', '<pre class="shiki shiki-dark '),
  ).contain('shiki shiki-dark')
  expect(
    highlighter
      .codeToHtml(`console.log('shiki');`, {
        lang: 'javascript',
        theme: 'github-light',
      })
      .replace('<pre class="shiki ', '<pre class="shiki shiki-light '),
  ).contain('shiki shiki-light')
})
