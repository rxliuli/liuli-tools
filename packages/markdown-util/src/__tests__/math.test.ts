import { expect, it } from 'vitest'
import { fromMarkdown, toMarkdown } from '../parse'

it('math block', () => {
  const md = `
$$
\\alpha_{i,r} = \\frac{t - t_i}{t_{i+k+1-r} - t_i}
$$
`.trim()
  expect(toMarkdown(fromMarkdown(md)).trim()).eq(md)
})

it('math inline', () => {
  const md = `$k$ 是 B 样条的次数，那么这个样条的阶数是$k+1$， 一段就有$k+1$个控制点`
  expect(toMarkdown(fromMarkdown(md)).trim()).eq(md)
})
