# @liuli-util/react-router

## Introduction

> [中文](https://github.com/rxliuli/liuli-tools/tree/master/packages/react-router/README.zh-CN.md)

Encapsulating react-router is a centralized js routing configuration, the component only exposes the necessary props, and the use of routing outside the react component is supported by default.

## Quick start

Installation dependencies

```sh
pnpm rm react-router-dom react-router
pnpm i @liuli-util/react-router
```

### Basic usage

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

Make `<ReactRouter />` as the root component and use the layout component

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

### Nested routing

Generally speaking, our page will have a certain layout structure, that is, the routing content is embedded in the layout, and nested routing can be used here.

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

### Asynchronous routing

It is almost the same as vue-router to use, just change the component to `() => import('path')`

```ts
export const routeList: RouteConfig[] = [
  { path: '/', component: () => import('../views/HomeView') },
  { path: '/hello-world', component: () => import('../views/HelloWorld') },
]
```

> [Example](https://github.com/rxliuli/liuli-tools/tree/master/examples/react-router-async-example)

### Use programmatic routing

```ts
import { history } from './router'

//Jump
history.push('/')
history.push({
  pathname: '/',
  query: { name: 'liuli' },
})
history.back()
//Get some information about the current route
history.location
```

## Using route query parameters

```ts
import { history } from './router'

//jump
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

get inside the component

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

Get outside the component

```ts
const params = new URLSearchParams(history.location.search)
console.log('search: ', {
  name: params.get('name'),
  age: params.get('age'),
  firends: params.getAll('firends'),
})
```

> Note: Currently only simple parameters are processed. For complex parameters, please use the form of json+base64 on the url.

## FAQ

### Why not use the official react-router

The official version update is simply a great reward for human confusing behavior. The update from 4 => 5 => 6 is basically an update for the purpose of updating, without improving the developer experience or efficiency, even in centralized routing and decentralized routing (I Never use it) Repeatedly jump on both sides. Take the update of react-router v6 as an example. I tried it briefly and found out that the previous useHistory is obsolete. The components of react-router-dom have been changed. I learned vue-router and added RouterView. The use of routing outside the react component is supported, and react-router-config is also abolished.
The routing configuration is essentially a tree structure. I don’t know why react components are bound. They used js centralized configuration like vue-router earlier => changed to use component configuration => changed to decentralized component configuration => roll Back to the centralized component configuration => Is the next step to roll back to the ts centralized configuration?

> react-router official nested routing sample code has been rolled back to centralized
> https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes
