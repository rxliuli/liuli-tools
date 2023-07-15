# @liuli-util/vite-plugin-node

Everything you need to build a nodejs app/lib with vite, hopefully making building node apps as easy as building web apps with vite.

The following functions are currently supported:

- [x] Support automatically bundle dependencies according to dependencies
- [x] Generate dts typedefs when bundle is supported
- [x] Support filling cjs features such as `__dirname`
- [x] Support out-of-the-box configs, but custom configs are also supported
- [x] Support bundle as cjs module -- currently also supported, but need to modify vite configuration
- [x] Support multi-entry builds
- [x] Support dts type bundle

In particular, it supports the use in the following scenarios

- lib
- cli
- nodejs server
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

| Name      | Type                            | Default        | Description                                                |
| --------- | ------------------------------- | -------------- | ---------------------------------------------------------- |
| `entry`   | `string, string[]`              | `src/index.ts` | entry file                                                 |
| `formats` | `('es', 'cjs')[]`               | `[es]`         | output format                                              |
| `shims`   | `boolean`                       | `false`        | Whether to fill `__dirname/require` and other cjs features |
| `dts`     | `boolean, { bundle?: boolean }` | `false`        | Whether to generate dts type definitions                   |

## Environment variables

vite naturally supports environment variables, but currently contains two types of environment variables, compile time and runtime

- Compile-time environment variables `import.meta.env.*`
- Runtime environment variables `process.env.*`

Compile-time environment variables have been replaced with static strings when the project is compiled, and are generally applicable to web applications. The runtime environment variable is suitable for dynamically specifying values when the project is running, and is generally applicable to node applications.
