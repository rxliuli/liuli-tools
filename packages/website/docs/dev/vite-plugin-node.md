# @liuli-util/vite-plugin-node

使用 vite 构建 nodejs app/lib 所需的一切，希望在构建 node 应用时，能够像使用 vite 构建 web 应用一样简单。

目前支持以下功能:

- [x] 支持根据 dependencies 自动 bundle 依赖
- [x] 支持 bundle 时生成 dts 类型定义
- [x] 支持填充 `__dirname` 等 cjs 特性
- [x] 支持开箱即用的配置，但也支持自定义配置
- [x] 支持 bundle 为 cjs 模块 -- 目前也支持，但需要修改 vite 的配置
- [x] 支持多入口的构建
- [x] 支持 dts 类型捆绑

特别是支持在以下场景使用

- lib
- cli
- nodejs server
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

| 名称      | 类型                            | 默认值         | 说明                                     |
| --------- | ------------------------------- | -------------- | ---------------------------------------- |
| `entry`   | `string, string[]`              | `src/index.ts` | 入口文件                                 |
| `formats` | `('es', 'cjs')[]`               | `[es]`         | 输出格式                                 |
| `shims`   | `boolean`                       | `false`        | 是否填充 `__dirname/require` 等 cjs 特性 |
| `dts`     | `boolean, { bundle?: boolean }` | `false`        | 是否生成 dts 类型定义                    |
| `outDir`  | `string`                        | `dist`         | 输出目录                                 |

## 其他

### 环境变量

vite 天然支持环境变量，但目前包含两类环境变量，编译时和运行时

- 编译时环境变量 `import.meta.env.*`
- 运行时环境变量 `process.env.*`

编译时环境变量在项目编译时就已经被替换为静态字符串，一般适用于 web 应用。而运行时环境变量适合在项目运行时动态指定值，一般适用于 node 应用。
