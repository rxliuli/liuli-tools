# @liuli-util/tree

树结构相关功能，包括树结构的遍历、映射、过滤、归并等，所有方法均为深度优先遍历。

主要功能

- `treeMap`: 映射
- `treeFilter`: 过滤
- `treeEach`: 遍历
- `treeToList`: 树转为列表
- `listToTree`: 列表转为树
- `treeReduce`: 归并

## 安装

```bash
pnpm i @liuli-util/tree
```

## treeMap 映射

将嵌套菜单转换为 JSX 元素渲染

```tsx
import { Menu } from 'antd'
import { treeMap } from '@liuli-util/tree'

const menus = [
  {
    key: 0,
    title: '系统配置',
    children: [
      { title: '用户列表', key: 1, path: '/system/user/list' },
      { title: '系统任务', key: 2, path: '/system/task/list' },
      { title: '系统权限', key: 3, path: '/system/permission/list' },
    ],
    icon: 'setting',
  },
  {
    key: 4,
    title: '其他',
    children: [{ title: '关于该项目', key: 5, children: [], icon: 'about' }],
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

## treeFilter 过滤

常见的一个场景是根据权限过滤出指定的菜单项。

```ts
import { treeFilter } from '@liuli-util/tree'

const menus = [
  {
    key: 0,
    title: '系统配置',
    children: [
      {
        title: '用户列表',
        key: 1,
        path: '/system/user/list',
        permission: 'user',
      },
      {
        title: '系统任务',
        key: 2,
        path: '/system/task/list',
        permission: 'task',
      },
      {
        title: '系统权限',
        key: 3,
        path: '/system/permission/list',
        permission: 'permission',
      },
    ],
    icon: 'setting',
  },
  {
    key: 4,
    title: '其他',
    children: [
      {
        title: '关于该项目',
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

## treeEach 遍历

当然，也可以只是简单的使用 `treeEach` 来遍历一棵树，查看其中的所有节点。

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

## treeToList 列表转树

将树转换为列表，常见的一个场景是将树转换为表格数据，或者转换为列表之后使用 lodash 之类的库更容易进行数据处理。

```ts
import { treeToList } from '@liuli-util/tree'

const list = treeToList(menus, {
  id: 'key',
  children: 'children',
  path: 'keyPath',
})

console.log('list', list)
```

## listToTree 树转列表

将列表转换为树，常见的一个场景是将后端返回的列表数据转换为树结构做渲染。

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

会得到

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

## treeReduce 归并

将树结构归并为一个值，几乎所有 tree 系列使用函数的基础，就像 Array 中的 reduce 一样，可以用来实现 treeMap、treeFilter 等功能。

先来看一个简单的例子，将树结构转换为一个 id => node 的 Map。

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

下面则是一段实际的代码，用来将 epub 的嵌套目录转换为 xml，在回调函数中，允许访问 4 个参数：

- `accumulator`：累加器，初始值为第三个参数
- `node`：当前节点
- `childrenResult`：子节点的归并结果
- `path`：当前节点的路径

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
