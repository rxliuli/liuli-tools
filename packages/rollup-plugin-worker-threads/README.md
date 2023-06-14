# rollup-plugin-worker-threads

## Introduction

Provides a better developer experience for `worker_threads` by automatically splitting the worker threads' code into separate files when packaging.

- ts is the first priority supported
- Instead of using the worker, run the function directly when the test is run

## Use

```shell
yarn add -D rollup-plugin-worker-threads # Install dependencies
```

### The first way

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

Specific code

```ts
// src/util/wrapWorkerFunc.ts
import { expose, Remote, wrap } from 'comlink'
import path from 'path'
import { isMainThread, parentPort, Worker } from 'worker_threads'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

/**
 * Wrapping functions to be executed in the worker
 * 1. return the function directly when it checks that the current file is not a js file
 * 2. when it is checked that it is executed in the main thread, use worker to wrap it and execute it
 * 3. use expose to wrap it and execute it when it is checked to be in the worker thread
 * Note: Currently a new worker is created each time, maybe consider supporting reuse of workers
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

### The second way

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

Specific code

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

### Why are there two ways to use it?

This project was originally inspired by vite's [Import Script as Worker](https://cn.vitejs.dev/guide/assets.html#importing-script-as-a-worker), but then I realized that nodejs itself provides the ability to write the main thread and worker thread in one But then I realized that nodejs itself provides a convenient way to write code for the main thread and worker thread in one file, so I tried both. At the moment I prefer the first way, and I will probably delete the second way of using it later.

### Why not use existing plugins?

Well, I can list some of the plugins I have researched and their issues.

- rollup-plugin-web-worker-loader
  - Does not handle ts files by default
  - worker does not package dependencies when they are included in the worker
- rollup-plugin-worker-factory
  - No example of ts in sight
  - The default is to modify the worker
- @surma/rollup-plugin-off-main-thread
  - Don't see the ts example

No satisfactory plugins have been found so far, so I may have to write a rollup plugin afterwards. As I said, no comparison is no harm, if there is no good support for ts+worker from vite, maybe I can still tolerate this bad development experience.
