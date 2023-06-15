# vite-plugin-node

Everything you need to build a nodejs app/lib with vite, hopefully making building node apps as easy as building web apps with vite.

The following functions are currently supported:

- [x] Support automatically bundle dependencies according to dependencies
- [x] Generate dts typedefs when bundle is supported
- [x] Support filling cjs features such as `__dirname`
- [x] Support out-of-the-box configs, but custom configs are also supported
- [ ] Support bundle as cjs module -- currently also supported, but vite configuration needs to be modified
- [ ] Support custom output file name -- currently also supported, but vite configuration needs to be modified
- [x] Support multi-entry construction

In particular, it supports the use in the following scenarios

-lib
-cli

- server
- vscode plugin

## Usage

Install

```bash
pnpm i -D @liuli-util/vite-plugin-node
```

Create entry file `src/index.ts`

```ts
import { createServer } from 'http'

const server = createServer((req, res) => {
  res.end('hello world')
})

server.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
```

Configure vite.config.ts

```ts
import { defineConfig } from 'vite'
import { node } from '@liuli-util/vite-plugin-node'

export default defineConfig({
  plugins: [node()],
})
```

then build

```bash
pnpm vite build
```

In fact, the lib itself is built with this plugin too!

## configuration

| Name    | Type               | Default        | Description                                        |
| ------- | ------------------ | -------------- | -------------------------------------------------- |
| `entry` | `string, string[]` | `src/index.ts` | entry file                                         |
| `shims` | `boolean`          | `false`        | Whether to fill `__dirname` and other cjs features |
| `dts`   | `boolean`          | `false`        | Whether to generate dts type definitions           |
