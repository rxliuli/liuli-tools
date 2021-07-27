# rollup-plugin-worker-threads

## 简介

为 `worker_threads` 提供更好开发者体验，打包时自动分割 worker 线程的代码到单独的文件。

- ts 是第一支持优先级
- 在测试运行时不会使用 worker 而是直接运行函数

## 使用

```shell
yarn add -D rollup-plugin-worker-threads # 安装依赖
```

### 第一种方式

```js
//rollup.config.js
import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { workerThreadsSuffix } from 'rollup-plugin-worker-threads'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { dir: 'dist/esm', format: 'esm' },
      { dir: 'dist/cjs', format: 'cjs' },
    ],
    plugins: [typescript(), workerThreadsSuffix()],
  },
])
```

具体代码

```ts
// src/util/wrapWorkerFunc.ts
import { expose, Remote, wrap } from 'comlink'
import path from 'path'
import { isMainThread, parentPort, Worker } from 'worker_threads'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

/**
 * 包装需要放到 worker 中执行的函数
 * 1. 当检查到当前文件不是 js 文件时会直接返回函数
 * 2. 当检查到在主线程时执行时，使用 Worker 包装并执行它
 * 3. 当检查到在 Worker 线程时，使用 expose 包装它然后执行
 * 注：目前是每次都创建新的 Worker，也许可以考虑支持复用 Worker
 * @param ep
 */
export function wrapWorkerFunc<T extends (...args: any[]) => any>(
  ep: T,
): Remote<T> {
  if (path.extname(__filename) !== '.js') {
    return ep as Remote<T>
  }
  if (isMainThread) {
    return ((...args: any[]) => {
      const worker = new Worker(__filename)
      const fn = wrap<T>(nodeEndpoint(worker))
      return (fn(...args) as Promise<any>).finally(() => worker.unref())
    }) as Remote<T>
  }
  expose(ep, nodeEndpoint(parentPort!))
  return ep as Remote<T>
}
```

```ts
// src/hello.worker.ts
import { wait } from '@liuli-util/async'
import { wrapWorkerFunc } from './util/wrapWorkerFunc'

async function _hello(name: string) {
  await wait(100)
  return `hello ${name}`
}

export const hello = wrapWorkerFunc(_hello)
```

```ts
// index.ts
export * from './hello.worker'
```

### 第二种方式

```js
//rollup.config.js
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
// index.ts
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

## FAQ

### 为什么会有两种使用方式？

这个项目最初的灵感来源于 vite 的 [导入脚本作为 Worker](https://cn.vitejs.dev/guide/assets.html#importing-script-as-a-worker)，但后来发现其实 nodejs 本身提供的在一个文件中编写主线程、worker 线程的代码也挺方便的，所以便同时尝试了两者。目前吾辈更倾向于第一种方式，后面可能会删掉第二种使用方式。

### 为什么不使用现有的插件？

好吧，我可以列举一些我调研过的插件及其问题。

- rollup-plugin-web-worker-loader
  - 默认不会处理 ts 文件
  - worker 中包含依赖时不会打包
- rollup-plugin-worker-factory
  - 没有看到 ts 的示例
  - 默认会修改 Worker
- @surma/rollup-plugin-off-main-thread
  - 没有看到 ts 的示例

目前没有找到满意的插件，后续可能不得不写一个 rollup 插件。还是那句话，没有对比就没有伤害，如果没有 vite 对 ts+worker 的良好支持，或许吾辈还能忍受这种糟糕的开发体验。
