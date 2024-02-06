# @liuli-util/async

异步相关功能的函数库

主要功能

- `wait`: 等待一段时间或满足特定条件
- `AsyncArray`: 异步数组，支持 `map`、`filter`、`reduce` 等方法，但均支持异步回调，还同时支持链式调用
- `asyncLimiting`: 限制一个异步函数的并发调用数量
- `once`: 保证一个异步函数只会被调用一次，并且正确处理了并发的情况
- `concatMap`: 等同于 rxjs 中的 [concatMap 操作符](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/concatmap.html)
- `exhaustMap`: 等同于 rxjs 中的 [exhaustMap 操作符](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/exhaustmap.html)
- `mergeMap`: 等同于 rxjs 中的 [mergeMap 操作符](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/mergemap.html)
- `switchMap`: 等同于 rxjs 中的 [switchMap 操作符](https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/switchmap.html)
- `debounce`: 之前实现的函数去抖，推荐使用 lodash-es
- `throttle`: 之前实现的函数节流，推荐使用 lodash-es

## 安装

```sh
pnpm i @liuli-util/async
```

## 使用

### wait

等待一段时间

```ts
import { wait } from '@liuli-util/async'

await wait(1000)
```

等待满足条件

```ts
import { wait } from '@liuli-util/async'

await wait(() => document.querySelector('#btn') !== null)
```

也可以使用异步函数

```ts
import { wait } from '@liuli-util/async'

await wait(async () => (await fetch('https://example.com/ping')).ok)
```

## AsyncArray

实现的数组方法如下，与 JavaScript 中 Array 的对应方法等价

- `reduce`
- `map`
- `filter`
- `flatMap`
- `forEach`

所有方法均提供以下两种调用方式

### 静态方法

使用 `AsyncArray.map(arr, callback)` 这种静态方法的方式调用，第一个参数是数组，第二个参数是异步的回调函数

下面是一个并发读取本地文件的示例

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

### 链式调用

也支持基本的链式调用，例如

```ts
import { AsyncArray } from '@liuli-util/async'

const r = new AsyncArray([1, 2, 3, 4, 5])
  .map(async (it) => it * 2)
  .filter(async (it) => it % 2 === 0)
  .reduce(async (acc, cur) => acc + cur, 0)
console.log(r)
```

## asyncLimiting

限制一个异步函数的并发调用数量，例如 10 个并发调用的情况下，只希望有一个任务在执行，其他任务都阻塞住的情况。常见的场景包括限制多线程下载请求的并发数量、递归复制文件限制并发文件操作数量等。

下面是一个简单的示例

```ts
import { asyncLimiting } from '@liuli-util/async'

const start = Date.now()
const f = asyncLimiting(() => wait(100), 1)
await Promise.all(Array(10).fill(0).map(f))
const end = Date.now()
console.log(end - start) // 超过 1000ms
```

## once

保证一个异步函数只会被调用一次，主要应用于在多个地方调用同一个初始化函数的场景。例如页面加载后拉取一次数据，但是可能会在多个地方调用，这时候就可以使用 `once` 来保证只会拉取一次数据。

下面是一个简单的示例

```ts
const f = once(async () => {
  console.log('init')
  return 1
})
const r = await Promise.all([f(), f(), f()]) // 只会输出一次 init
```
