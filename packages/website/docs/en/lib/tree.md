# @liuli-util/tree

Tree-related functions, including tree traversal, mapping, filtering, and reduction. All methods perform depth-first traversal.

Main features

*   `treeMap`: Mapping
*   `treeFilter`: Filtering
*   `treeEach`: Traversal
*   `treeToList`: Tree to list conversion
*   `listToTree`: List to tree conversion
*   `treeReduce`: Reduction

## Installation

```bash
pnpm i @liuli-util/tree
```

## treeMap - Mapping

Convert nested menus to JSX element rendering

```tsx
import { Menu } from 'antd'
import { treeMap } from '@liuli-util/tree'

const menus = [
  {
    key: 0,
    title: 'System Configuration',
    children: [
      { title: 'User List', key: 1, path: '/system/user/list' },
      { title: 'System Task', key: 2, path: '/system/task/list' },
      { title: 'System Permission', key: 3, path: '/system/permission/list' },
    ],
    icon: 'setting',
  },
  {
    key: 4,
    title: 'Other',
    children: [{ title: 'About This Project', key: 5, children: [], icon: 'about' }],
    icon: 'user',
  },
]

function App() {
  return (
    <Menu mode="inline">
      {treeMap(
        menus,
        (it) =>
          it.children ? (
            <Menu.SubMenu key={it.key} title={it.title}>
              {it.children}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={it.key}>{it.title}</Menu.Item>
          ),
        {
          id: 'key',
          children: 'children',
        },
      )}
    </Menu>
  )
}
```

## treeFilter - Filtering

A common scenario is filtering out specific menu items based on permissions.

```ts
import { treeFilter } from '@liuli-util/tree'

const menus = [
  {
    key: 0,
    title: 'System Configuration',
    children: [
      {
        title: 'User List',
        key: 1,
        path: '/system/user/list',
        permission: 'user',
      },
      {
        title: 'System Task',
        key: 2,
        path: '/system/task/list',
        permission: 'task',
      },
      {
        title: 'System Permission',
        key: 3,
        path: '/system/permission/list',
        permission: 'permission',
      },
    ],
    icon: 'setting',
  },
  {
    key: 4,
    title: 'Other',
    children: [
      {
        title: 'About This Project',
        key: 5,
        icon: 'about',
        permission: 'about',
      },
    ],
    icon: 'user',
  },
]

const permissions = ['user', 'task']

const res = treeFilter(
  menus,
  (it) => {
    if (!it.permission) {
      return true
    }
    return permissions.includes(it.permission)
  },
  {
    id: 'key',
    children: 'children',
  },
)

console.log(res)
```

## treeEach - Traversal

Of course, you can also simply use `treeEach` to traverse a tree and view all the nodes in it.

```ts
import { treeEach } from '@liuli-util/tree'

treeEach(
  menus,
  (it) => {
    console.log(it.title)
  },
  {
    id: 'key',
    children: 'children',
  },
)
```

## treeToList - Tree to List

Convert a tree to a list. A common scenario is to convert a tree to tabular data or use libraries like lodash for easier data processing.

```ts
import { treeToList } from '@liuli-util/tree'

const list = treeToList(menus, {
  id: 'key',
  children: 'children',
  path: 'keyPath',
})

console.log('list', list)
```

## listToTree - List to Tree

Convert a list to a tree. A common scenario is to render tree structures by converting list data returned from the backend.

```ts
import { listToTree } from '@liuli-util/tree'
const list = [
  { id: 3, parent: 1 },
  { id: 4, parent: 1 },
  { id: 1, parent: 0 },
  { id: 2, parent: 0 },
  { id: 5, parent: 2 },
  { id: 6, parent: 2 },
  { id: 0 },
]
const [res] = listToTree(list, { id: 'id', parentId: 'parent', children: 'children' })
```

Result:

```json
{
  "id": 0,
  "children": [
    {
      "id": 1,
      "parent": 0,
      "children": [
        { "id": 3, "parent": 1 },
        { "id": 4, "parent": 1 }
      ]
    },
    {
      "id": 2,
      "parent": 0,
      "children": [
        { "id": 5, "parent": 2 },
        { "id": 6, "parent": 2 }
      ]
    }
  ]
}
```

## treeReduce - Merge

Merges a tree structure into a single value. Almost all tree-related functions use this function as a base, just like `reduce` in Array, and it can be used to achieve functionalities like `treeMap` and `treeFilter`.

Let's start with a simple example, converting a tree structure into a `Map` of `id => node`.

```ts
import { treeReduce } from '@liuli-util/tree'

const res = treeReduce(
  menus,
  (acc, it) => {
    acc.set(it.key, it)
    return acc
  },
  new Map(),
  {
    id: 'key',
    children: 'children',
  },
)
console.log(res)
```

Here is another code snippet that converts a nested directory of an EPUB into XML. In the callback function, you can access four parameters:

*   `accumulator`: The accumulator, initialized as the third parameter.
*   `node`: The current node.
*   `childrenResult`: The merged result of the children nodes.
*   `path`: The path of the current node.

```ts
import { treeReduce } from '@liuli-util/tree'

const result = treeReduce(
  toc,
  (accumulator, node, childrenResult, path) => {
    const indent = '  '.repeat(path.length + 1)
    const childrenHtml = childrenResult
    return (
      accumulator +
      `\n${indent}<li>\n${indent}  <a href="./${node.chapterId}.xhtml">${node.title}</a>` +
      (childrenHtml ? `\n${indent}  <ol>${childrenHtml}\n${indent}  </ol>\n${indent}</li>` : `\n${indent}</li>`)
    )
  },
  '',
  {
    id: 'chapterId',
    children: 'children',
  },
)
```
