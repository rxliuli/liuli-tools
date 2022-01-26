# @liuli-util/rollup-plugin-graphql-codegen

> [中文](https://github.com/rxliuli/liuli-tools/blob/master/libs/rollup-plugin-graphql-codegen/README.zh-CN.md)

A vite/rollup plug-in, can be in worker thread that executes graphql codegen.

## Setup GraphQL Codegen

> ref: [graphql-code-generator](https://www.graphql-code-generator.com/docs/getting-started/installation)

## Install

```bash
# pnpm
pnpm i -D @liuli-util/rollup-plugin-graphql-codegen
# yarn
yarn add -D @liuli-util/rollup-plugin-graphql-codegen
```

## Initialize

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { gql2TsConfig, graphQLCodegen } from '@liuli-util/rollup-plugin-graphql-codegen'

export default defineConfig({
  plugins: [graphQLCodegen(gql2TsConfig)],
})
```

> Example: [rollup-plugin-graphql-codegen-example](https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-graphql-codegen-example)
