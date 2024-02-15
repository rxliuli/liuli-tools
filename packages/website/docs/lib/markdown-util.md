# @liuli-util/markdown-util

markdown 封装工具，基于 mdast 提供所有在处理 markdown 中需要用到的函数。建议使用 [astexplorer](https://astexplorer.net/) 来查看 mdast 的结构。

## 解析与输出

### fromMarkdown

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

### toMarkdown

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

### mdToHast

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

### hastToHtml

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

## AST 实用函数

### visit

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

### getYamlMeta

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

### setYamlMeta

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

### flatMap

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

### select

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

### selectAll

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

## 其他

### cjk

支持目前 markdown 无法处理的中文，例如在使用强调时，你可能会遇到不生效的情况，下面是已知的一些情况。

| example      | render     |
| ------------ | ---------- |
| `**真，**她` | **真，**她 |
| `**真。**她` | **真。**她 |
| `**真、**她` | **真、**她 |
| `**真；**她` | **真；**她 |
| `**真：**她` | **真：**她 |
| `**真？**她` | **真？**她 |
| `**真！**她` | **真！**她 |
| `**真“**她`  | **真“**她  |
| `**真”**她`  | **真”**她  |
| `**真‘**她`  | **真‘**她  |
| `**真’**她`  | **真’**她  |
| `**真（**她` | **真（**她 |
| `**真）**她` | **真）**她 |
| `**真【**她` | **真【**她 |
| `**真】**她` | **真】**她 |
| `**真《**她` | **真《**她 |
| `**真》**她` | **真》**她 |
| `**真—**她`  | **真—**她  |
| `**真～**她` | **真～**她 |
| `**真…**她`  | **真…**她  |
| `**真·**她`  | **真·**她  |
| `**真〃**她` | **真〃**她 |
| `**真-**她`  | **真-**她  |
| `**真々**她` | **真々**她 |
| `**真**她`   | **真**她   |

有一些解决方法，但并不直观。例如添加额外的空格、避免将中文符号放在 `**` 前面、甚至是添加零宽度空格之类的。

| example                      | render                     |
| ---------------------------- | -------------------------- |
| `**真，** 她`                | **真，** 她                |
| `**真**，她`                 | **真**，她                 |
| `**真，**&ZeroWidthSpace;她` | **真，**&ZeroWidthSpace;她 |

目前 cjk 扩展函数主要从两个方面来支持

1. 如果发现强调之后存在空格，则会清除。例如 `**真，** 她` 会被渲染为 `<p><strong>真，</strong>她</p>`
2. 支持直接正确解析 `**真，**她`。会被渲染为 `<p><strong>真，</strong>她</p>`

两者各有优缺点。

1. 增加了额外的空格之后，可以在任何平台渲染，尽管会有额外的空格。
2. 非常直观和符合直觉，但在其他平台不一定能正确渲染，例如 github。并且，这会破坏一些现有的渲染规则，例如 `\*\*真，\*\*她` 也会被渲染为 `<p><strong>真，</strong>她</p>`。

目前针对 markdown 规范修改的 [相关 issue](https://github.com/commonmark/commonmark-spec/issues/650) 正在讨论中。
