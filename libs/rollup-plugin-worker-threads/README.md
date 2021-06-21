# rollup-plugin-worker-threads

## 简介

为 `worker_threads` 提供类似 vite 的开发者体验，自动分割代码到 worker 到单独的文件。

## 基本使用

安装

```shell
yarn add -D rollup-plugin-worker-threads
```

配置

```js
import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { workerThreads } from 'rollup-plugin-worker-threads'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { dir: 'dist/esm', format: 'esm' },
      { dir: 'dist/cjs', format: 'cjs' },
    ],
    plugins: [typescript(), workerThreads()],
  },
])
```

具体代码

```ts
//index.ts
import HelloWorker from './worker?worker'
import type { worker as helloType } from './worker'
import { wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

export async function hello(name: string) {
  const worker = new HelloWorker()
  try {
    const helloWorker = wrap<typeof helloType>(nodeEndpoint(worker))
    return await helloWorker(name)
  } finally {
    worker.unref()
  }
}
```

```ts
// worker.ts
import { wait } from '@liuli-util/async'
import { expose } from 'comlink'
import { parentPort } from 'worker_threads'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

export async function worker(name: string) {
  await wait(1_00)
  return `hello ${name}`
}

expose(worker, nodeEndpoint(parentPort!))
```
