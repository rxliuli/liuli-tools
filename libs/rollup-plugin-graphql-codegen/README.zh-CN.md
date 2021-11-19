# @liuli-util/rollup-plugin-graphql-codegen

一个 vite/rollup 插件，可以在 worker thread 中执行 graphql codegen。

## 配置 GraphQL Codegen

> 参考: [graphql-code-generator](https://www.graphql-code-generator.com/docs/getting-started/installation) 或者 [在 ts 中使用 graphql](https://blog.rxliuli.com/p/349ef4aeec0c466c8566d8383f596941/)

## 安装

```bash
# pnpm
pnpm i -D @liuli-util/rollup-plugin-graphql-codegen
# yarn
yarn add -D @liuli-util/rollup-plugin-graphql-codegen
```

## 使用插件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { graphQLCodegen } from '@liuli-util/rollup-plugin-graphql-codegen'

export default defineConfig({
  plugins: [graphQLCodegen()],
})
```

> 示例项目: [rollup-plugin-graphql-codegen-example](https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-graphql-codegen-example)
