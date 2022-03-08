# @liuli-util/react-router

## 简介

封装 react-router 为集中式的 js 路由配置，组件仅暴露必要的 props，并且默认支持在 react 组件外使用路由。

## 快速入门

安装依赖

```sh
pnpm rm react-router-dom react-router
pnpm i @liuli-util/react-router
```

### 基本使用

```ts
//router.ts
import { RouteConfig, createHashHistory } from '@liuli-util/react-router'
import { HomeView } from '../views/HomeView'
import { HelloWorld } from '../views/HelloWorld'

export const routeList: RouteConfig[] = [
  { path: '/', component: HomeView },
  { path: '/hello-world', component: HelloWorld },
]

export const history = createHashHistory()
```

将 `<ReactRouter />` 作为根组件，并使用 layout 组件

```tsx
//main.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ReactRouter } from '@liuli-util/react-router'
import { history, routeList } from './constants/router'

ReactDOM.render(
  <React.StrictMode>
    <ReactRouter history={history} routes={routeList} />
  </React.StrictMode>,
  document.getElementById('root'),
)
```

> [Example](https://github.com/rxliuli/liuli-tools/tree/master/examples/react-router-basic-example)

### 嵌套路由

一般而言，我们的页面会有某种布局结构，即路由内容是嵌入在布局之中，这里可以使用嵌套路由实现。

```ts
//router.ts
import { RouteConfig, createHashHistory } from '@liuli-util/react-router'
import { HomeView } from '../views/HomeView'
import { HelloWorld } from '../views/HelloWorld'

export const routeList: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: HomeView },
      { path: '/hello-world', component: HelloWorld },
    ],
  },
]

export const history = createHashHistory()
```

```tsx
import * as React from 'react'
import { RouterView } from '@liuli-util/react-router'

export const Layout: React.FC = () => (
  <div>
    <h2>Layout Header</h2>
    <RouterView />
  </div>
)
```

> [Example](https://github.com/rxliuli/liuli-tools/tree/master/examples/react-router-nest-example)

### 异步路由

使用起来几乎与 vue-router 保持一致，只需要将组件改为 `() => import('path')` 即可

```ts
export const routeList: RouteConfig[] = [
  { path: '/', component: () => import('../views/HomeView') },
  { path: '/hello-world', component: () => import('../views/HelloWorld') },
]
```

> [Example](https://github.com/rxliuli/liuli-tools/tree/master/examples/react-router-async-example)

### 使用编程式路由

```ts
import { history } from './router'

//跳转
history.push('/')
history.push({
  pathname: '/',
  query: { name: 'liuli' },
})
history.back()
//获取当前路由的一些信息
history.location
```

## 使用路由查询参数

```ts
import { history } from './router'

//跳转
history.push({
  pathname: '/',
  query: {
    pathname: '/hello-world',
    query: {
      name: 'liuli',
      age: 17,
      firends: ['miku', 'sora'],
    },
  },
})
```

在组件内获取

```ts
const [params] = useSearchParams()

return (
  <pre>
    {JSON.stringify(
      {
        name: params.get('name'),
        age: params.get('age'),
        firends: params.getAll('firends'),
      },
      null,
      2,
    )}
  </pre>
)
```

在组件外获取

```ts
const params = new URLSearchParams(history.location.search)
console.log('search: ', {
  name: params.get('name'),
  age: params.get('age'),
  firends: params.getAll('firends'),
})
```

> 注意：目前仅处理简单的参数，复杂参数请使用 json+base64 的形式放在 url 上。

## FAQ

### 为什么不使用官方的 react-router

官方的版本更新简直堪称人类迷惑行为大赏，从 4 => 5 => 6 的更新基本上是为了更新而更新，没有提高开发者体验或效率，甚至在集中式路由和分散式路由（我从不使用它）两边反复横跳。就拿 react-router v6 的更新来说，吾辈简单试用了一下，目前发现之前的 useHistory 废了，react-router-dom 的那些组件换了一茬，学 vue-router 把 RouterView 加进来了，官方不再支持在 react 组件外使用路由，还废掉了 react-router-config。
路由配置本质上就是一个树结构，不知道为什么绑定 react 组件，他们从早前和 vue-router 一样通过 js 集中式配置 => 改成使用组件配置 => 改成分散式的组件配置 => 滚回集中式的组件配置 => 下一步是不是要滚回 ts 集中式的配置？

> react-router 官方嵌套路由示例代码已经滚回了集中式
> https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes
