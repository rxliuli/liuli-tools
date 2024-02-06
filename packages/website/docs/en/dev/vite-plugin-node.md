# @liuli-util/vite-plugin-node

Everything you need to build a nodejs app/lib with vite, with the simplicity of building web apps with vite.

Currently supports the following features:

*   [x] Automatically bundling dependencies based on dependencies
*   [x] Generate dts type definitions when bundling
*   [x] Support filling in cjs features such as `__dirname`
*   [x] Out-of-the-box configuration, but also supports custom configuration
*   [x] Support bundling as cjs modules - currently supported, but requires modifying vite's configuration
*   [x] Support for multi-entry builds
*   [x] Support for bundling dts types

Especially useful in the following scenarios

*   lib
*   cli
*   nodejs server
*   vscode plugin

## Usage

Install

```bash
pnpm i -D @liuli-util/vite-plugin-node
```

Create an entry file `src/index.ts`

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

Then build

```bash
pnpm vite build
```

In fact, this lib itself is also built using this plugin!

## Configuration

| Name      | Type                            | Default        | Description                                              |
| --------- | ------------------------------- | -------------- | -------------------------------------------------------- |
| `entry`   | `string, string[]`              | `src/index.ts` | Entry file                                               |
| `formats` | `('es', 'cjs')[]`               | `[es]`         | Output formats                                           |
| `shims`   | `boolean`                       | `false`        | Whether to fill in cjs features like `__dirname/require` |
| `dts`     | `boolean, { bundle?: boolean }` | `false`        | Whether to generate dts type definitions                 |
| `outDir`  | `string`                        | `dist`         | Output directory                                         |

## Others

### Environment Variables

Vite naturally supports environment variables, but currently includes two types of variables, compile-time and run-time

*   Compile-time environment variables `import.meta.env.*`
*   Run-time environment variables `process.env.*`

Compile-time environment variables are replaced with static strings during project compilation and are generally suitable for web applications. Runtime environment variables are suitable for dynamically specifying values during project runtime and are generally used for node applications.
