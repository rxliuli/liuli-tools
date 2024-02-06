# @liuli-util/markdown-util

markdown 封装工具，基于 mdast 提供所有在处理 markdown 中需要用到的函数。建议使用 [astexplorer](https://astexplorer.net/) 来查看 mdast 的结构。

## fromMarkdown

将 markdown 转换为 mdast，支持自动解析 yaml 元数据。

```ts
import { fromMarkdown } from '@liuli-util/markdown-util'

const md = `
# 标题
这是一段文本
`.trim()
const mdast = fromMarkdown(md)
console.log(mdast)
```

## toMarkdown

将 mdast 转换为 markdown。

```ts
import { toMarkdown } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
const md = toMarkdown(mdast)
console.log(md)
```

## mdToHast

将 mdast 转换为 hast，hast 是一种表示 html ast 的语法树，这个函数就是将 markdown 的语法树转换为 html 的语法树。

```ts
import { mdToHast } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
const hast = mdToHast(mdast)
console.log(hast)
```

## hastToHtml

将 hast 转换为 html。

```ts
import { hastToHtml } from '@liuli-util/markdown-util'

const hast = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'h1',
      properties: {},
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
const html = hastToHtml(hast)
console.log(html)
```

## visit

遍历 mdast，支持修改节点。

```ts
import { visit } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
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

获取 mdast 中的 yaml 元数据。

```ts
import { getYamlMeta } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'yaml',
      value: 'title: 标题\n',
    },
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
const res = getYamlMeta(mdast)
console.log(res) // { title: '标题' }
```

## setYamlMeta

设置 mdast 中的 yaml 元数据。

```ts
import { setYamlMeta } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
setYamlMeta(mdast, { title: '标题' })
console.log(mdast)
```

## flatMap

映射一棵 ast 树，可以删除或新增节点。

```ts
import { flatMap } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
flatMap(mdast, (node) => {
  if (node.type === 'heading') {
    return [
      {
        type: 'paragraph',
        children: [{ type: 'text', value: '这是一段文本' }],
      },
    ]
  }
  return [node]
})
console.log(mdast)
```

如果返回 `[]`，则会删除该节点。

```ts
import { flatMap } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
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

选择 mdast 中的节点

```ts
import { select } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
const res = select(mdast, 'heading')
console.log(res)
```

## selectAll

选择 mdast 中的所有节点

```ts
import { selectAll } from '@liuli-util/markdown-util'

const mdast = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: '标题' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', value: '这是一段文本' }],
    },
  ],
}
const res = selectAll(mdast, 'heading')
console.log(res)
```
