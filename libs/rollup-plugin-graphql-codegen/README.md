# @liuli-util/vite-plugin-graphql-codegen

Experimental zero-config vite plugin that uses the vite file watcher to run [graphql codegen](https://www.graphql-code-generator.com/) programmatically without needing to start a separate watcher.

## Setup GraphQL Codegen

Installation instructions found [here](https://www.graphql-code-generator.com/docs/getting-started/installation). Optional if already set up in project.

## Install

```bash
# pnpm
pnpm i -D @liuli-util/vite-plugin-graphql-codegen
# yarn
yarn add -D vite-plugin-graphql-codegen
```

## Initialize

```js
# vite.config.ts

import { defineConfig } from 'vite';
import { graphQLCodegen } from '@liuli-util/rollup-plugin-graphql-codegen'

export default defineConfig({
  plugins: [
    graphQLCodegen()
  ],
});
```

> Example: [rollup-plugin-graphql-codegen-example](https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-graphql-codegen-example)
