import { expect, it } from 'vitest'
import { fromMarkdown, toMarkdown } from '../parse'
import { stringify, toHtml } from '../stringify'

it('basic', () => {
  const str = '## Hello **World**!'
  const ast = fromMarkdown(str)
  expect(toMarkdown(ast).trim()).toBe(str)
  const res = stringify(ast)
  expect(res).toBe('<h2>Hello <strong>World</strong>!</h2>')
})
