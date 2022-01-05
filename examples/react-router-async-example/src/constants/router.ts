import { RouteConfig, createHashHistory } from '@liuli-util/react-router'

export const routeList: RouteConfig[] = [
  { path: '/', component: () => import('../views/HomeView') },
  { path: '/hello-world', component: () => import('../views/HelloWorld') },
]

export const history = createHashHistory()
