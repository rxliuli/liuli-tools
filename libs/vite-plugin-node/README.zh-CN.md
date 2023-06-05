# vite-plugin-node

使用 vite 构建 nodejs app/lib 所需的一切，希望在构建 node 应用时，能够像使用 vite 构建 web 应用一样简单。

目前支持以下功能:

- [x] 支持根据 dependencies 自动 bundle 依赖
- [x] 支持 bundle 时生成 dts 类型定义
- [x] 支持填充 `__dirname` 等 cjs 特性
- [x] 支持开箱即用的配置，但也支持自定义配置
- [ ] 支持 bundle 为 cjs 模块 -- 目前也支持，但需要修改 vite 的配置
- [ ] 支持自定义 output 的文件名 -- 目前也支持，但需要修改 vite 的配置

特别是支持在以下场景使用

- lib
- cli
- server
- vscode plugin

## 使用

安装

```bash
pnpm i -D @liuli-util/vite-plugin-node
```

创建入口文件 `src/index.ts`

```ts
import { createServer } from 'http'

const server = createServer((req, res) => {
  res.end('hello world')
})

server.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
```

配置 vite.config.ts

```ts
import { defineConfig } from 'vite'
import { node } from '@liuli-util/vite-plugin-node'

export default defineConfig({
  plugins: [node()],
})
```

然后构建

```bash
pnpm vite build
```

事实上，这个 lib 本身也使用这个插件构建！

## 配置

| 名称    | 类型      | 默认值         | 说明                             |
| ------- | --------- | -------------- | -------------------------------- |
| `entry` | `string`  | `src/index.ts` | 入口文件                         |
| `shims` | `boolean` | `false`        | 是否填充 `__dirname` 等 cjs 特性 |
| `dts`   | `boolean` | `false`        | 是否生成 dts 类型定义            |
