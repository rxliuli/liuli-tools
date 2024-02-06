# @liuli-util/markdown-util

Markdown encapsulation tool that provides all the functions needed to process Markdown based on mdast. It is recommended to use [astexplorer](https://astexplorer.net/) to view the structure of mdast.

## fromMarkdown

Converts Markdown to mdast, supports automatic parsing of YAML metadata.

```ts
import { fromMarkdown } from '@liuli-util/markdown-util'

const md = `
# Title
This is a paragraph
`.trim()
const mdast = fromMarkdown(md)
console.log(mdast)
```

## toMarkdown

Converts mdast to Markdown.

```ts
import { toMarkdown } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
const md = toMarkdown(mdast)
console.log(md)
```

## mdToHast

Converts mdast to hast. Hast is a syntax tree that represents HTML AST. This function converts the syntax tree of Markdown to the syntax tree of HTML.

```ts
import { mdToHast } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
const hast = mdToHast(mdast)
console.log(hast)
```

## hastToHtml

Converts hast to html.

```ts
import { hastToHtml } from '@liuli-util/markdown-util'

const hast = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'h1',
      properties: {},
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
const html = hastToHtml(hast)
console.log(html)
```

## visit

Traverse mdast, supports modifying nodes.

```ts
import { visit } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
visit(mdast, (node) => {
  if (node.type === 'heading') {
    node.depth = 2
  }
})
console.log(mdast)
```

## getYamlMeta

Get YAML metadata from mdast.

```ts
import { getYamlMeta } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'yaml',
      value: 'title: Title\n',
    },
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
const res = getYamlMeta(mdast)
console.log(res) // { title: 'Title' }
```

## setYamlMeta

Set YAML metadata in mdast.

```ts
import { setYamlMeta } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
setYamlMeta(mdast, { title: 'Title' })
console.log(mdast)
```

## flatMap

Map an ast tree, nodes can be deleted or added.

```ts
import { flatMap } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
flatMap(mdast, (node) => {
  if (node.type === 'heading') {
    return [
      {
        type: 'paragraph',
        children: [{ type: 'text', value: 'This is a paragraph' }],
      },
    ]
  }
  return [node]
})
console.log(mdast)
```

If an empty array `[]` is returned, the node will be deleted.

```ts
import { flatMap } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
flatMap(mdast, (node) => {
  if (node.type === 'heading') {
    return []
  }
  return [node]
})
console.log(mdast)
```

## select

Select nodes in mdast.

```ts
import { select } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
const res = select(mdast, 'heading')
console.log(res)
```

## selectAll

Select all nodes in mdast.

```ts
import { selectAll } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This is a paragraph' }],
    },
  ],
}
const res = selectAll(mdast, 'heading')
console.log(res)
```
