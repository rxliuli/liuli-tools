import { beforeEach, expect, it } from 'vitest'
import { treeReduce } from '../treeReduce'

interface Node {
  id: number
  children?: Node[]
}

let tree: Node[]
beforeEach(() => {
  tree = [
    {
      id: 1,
      children: [{ id: 2 }],
    },
    {
      id: 3,
    },
  ]
})

it('join', () => {
  let r = treeReduce(
    tree,
    (r, node, childrenResult, path) => {
      const childrenHtml = childrenResult
      return r + `<li id="${node.id}">` + (childrenHtml ? `<ol>${childrenHtml}</ol>` : '') + '</li>'
    },
    '',
    {
      id: 'id',
      children: 'children',
    },
  )
  r = `<ol>${r}</ol>`
  expect(r).eq('<ol><li id="1"><ol><li id="2"></li></ol></li><li id="3"></li></ol>')
})

it('tree to list', () => {
  const r = treeReduce(
    tree,
    (r, node, childrenResult, path) => {
      return [...r, node, ...childrenResult]
    },
    [] as Node[],
    {
      id: 'id',
      children: 'children',
    },
  )
  expect(r.map((it) => it.id).sort()).deep.eq([1, 2, 3])
})
