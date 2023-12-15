import { describe } from 'node:test'
import { expect, it } from 'vitest'
import { fromMarkdown, toMarkdown } from '../parse'
import { stringify, toHtml } from '../stringify'
import { getYamlMeta, select, setYamlMeta, YAML } from '../utils'

it('yaml', () => {
  const str = `
---
title: hello world
date: 2022-08-11
---

content
`.trim()
  const root = fromMarkdown(str)
  const meta = select('yaml', root) as YAML
  expect(stringify(root)).toBe('<p>content</p>')
  expect(meta.value).toBe('title: hello world\ndate: 2022-08-11')
})

it('update yaml', () => {
  const str = `
---
title: hello world
date: 2022-08-11
---

content
  `.trim()
  const root = fromMarkdown(str)

  const meta = getYamlMeta<{ title: string; date: string }>(root)

  expect(meta).toEqual({ title: 'hello world', date: '2022-08-11' })
  const title = 'hello'
  const date = new Date().toLocaleDateString()
  meta.title = title
  setYamlMeta(root, { title, date })
  expect(getYamlMeta(root)).toEqual({ title, date })

  const r = toMarkdown(root)
  expect(r.includes(title)).toBeTruthy()
  expect(r.includes(date)).toBeTruthy()
})

it('set yaml', () => {
  const root = fromMarkdown('# hello')
  const meta = { name: 'liuli', age: 17 }
  setYamlMeta(root, meta)
  const r = getYamlMeta(root)
  expect(r).deep.eq(meta)
})

it('remove yaml', () => {
  const root = fromMarkdown(
    `
---
type: post
---
# hello
  `.trim(),
  )
  setYamlMeta(root, null)
  const r = toMarkdown(root)
  expect(r.includes('type: post')).false
})
