# @liuli-util/async

Library of functions related to asynchronous operations.

Main features

*   `wait`: Wait for a certain amount of time or for a specific condition to be met.
*   `AsyncArray`: Asynchronous array that supports methods like `map`, `filter`, `reduce`, etc. with asynchronous callbacks, and also supports chaining.
*   `asyncLimiting`: Limit the concurrent invocations of an asynchronous function.
*   `once`: Ensure that an asynchronous function is only called once and handle concurrency correctly.
*   `concatMap`: Equivalent to the [concatMap operator](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/concatmap.html) in RxJS.
*   `exhaustMap`: Equivalent to the [exhaustMap operator](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/exhaustmap.html) in RxJS.
*   `mergeMap`: Equivalent to the [mergeMap operator](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/mergemap.html) in RxJS.
*   `switchMap`: Equivalent to the [switchMap operator](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/switchmap.html) in RxJS.
*   `debounce`: Previously implemented debounce function, recommended to use lodash-es.
*   `throttle`: Previously implemented throttle function, recommended to use lodash-es.

## Installation

```sh
pnpm i @liuli-util/async
```

## Usage

### wait

Wait for a certain amount of time.

```ts
import { wait } from '@liuli-util/async'

await wait(1000)
```

Wait until a condition is met.

```ts
import { wait } from '@liuli-util/async'

await wait(() => document.querySelector('#btn') !== null)
```

Async functions can also be used.

```ts
import { wait } from '@liuli-util/async'

await wait(async () => (await fetch('https://example.com/ping')).ok)
```

## AsyncArray

The implemented array methods are equivalent to the corresponding methods in JavaScript's Array.

*   `reduce`
*   `map`
*   `filter`
*   `flatMap`
*   `forEach`

All methods provide the following two ways of calling:

### Static methods

Call the methods with the array as the first argument and the asynchronous callback function as the second argument, like `AsyncArray.map(arr, callback)`.

Here's an example of concurrently reading local files:

```ts
import { AsyncArray } from '@liuli-util/async'
import { readFile, readdir } from 'fs/promises'
import path from 'path'

const r = await AsyncArray.map(await readdir(__dirname), async (it) => ({
  name: it,
  content: await readFile(path.resolve(__dirname, it), 'utf-8'),
}))
console.log(r)
```

### Chaining

Chaining is also supported, for example:

```ts
import { AsyncArray } from '@liuli-util/async'

const r = new AsyncArray([1, 2, 3, 4, 5])
  .map(async (it) => it * 2)
  .filter(async (it) => it % 2 === 0)
  .reduce(async (acc, cur) => acc + cur, 0)
console.log(r)
```

## asyncLimiting

Limit the concurrent invocations of an asynchronous function. For example, if there are 10 concurrent invocations and only one task is expected to be executing while others are blocked. Common scenarios include limiting the number of concurrent download requests in multi-threading, limiting the number of concurrent file operations in recursive file copying, etc.

Here's a simple example:

```ts
import { asyncLimiting } from '@liuli-util/async'

const start = Date.now()
const f = asyncLimiting(() => wait(100), 1)
await Promise.all(Array(10).fill(0).map(f))
const end = Date.now()
console.log(end - start) // More than 1000ms
```

## once

Ensure that an asynchronous function is only called once. It is mainly used in scenarios where the same initialization function is called in multiple places. For example, fetch data once after the page is loaded, but it may be called in multiple places. In this case, you can use `once` to ensure that the data is only fetched once.

Here's a simple example:

```ts
const f = once(async () => {
  console.log('init')
  return 1
})
const r = await Promise.all([f(), f(), f()]) // Only outputs 'init' once
```
